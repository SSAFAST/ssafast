package com.rocket.ssafast.auth.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.auth.dto.request.LoginReqUserDto;
import com.rocket.ssafast.auth.dto.response.TokenDto;
import com.rocket.ssafast.auth.jwt.JwtTokenProvider;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.user.domain.User;
import com.rocket.ssafast.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final BCryptPasswordEncoder encoder;
	private final RedisService redisService;
	private final UserRepository userRepository;

	// 토큰 재발급: validate 메서드가 true 반환할 때만 사용 -> AT, RT 재발급
	@Transactional
	public TokenDto reissue(String requestAccessTokenInHeader, String requestRefreshToken) {
		String requestAccessToken = resolveToken(requestAccessTokenInHeader);
		Authentication authentication = jwtTokenProvider.getAuthentication(requestAccessToken);
		String principal = getPrincipal(requestAccessToken);

		String refreshTokenInRedis = redisService.getValues(principal);
		if (refreshTokenInRedis == null) { // Redis에 저장되어 있는 RT가 없을 경우
			return null; // -> 재로그인 요청
		}

		// 요청된 RT의 유효성 검사 & Redis에 저장되어 있는 RT와 같은지 비교
		if(!jwtTokenProvider.validateRefreshToken(requestRefreshToken) || !refreshTokenInRedis.equals(requestRefreshToken)) {
			return null; // -> 재로그인 요청
		}

		SecurityContextHolder.getContext().setAuthentication(authentication);

		// 토큰 재발급 및 Redis 업데이트
		redisService.deleteValues(principal); // 기존 RT 삭제
		TokenDto tokenDto = jwtTokenProvider.createToken(principal);
		saveRefreshToken(principal, tokenDto.getRefreshToken());
		return tokenDto;
	}

	// 토큰 발급
	@Transactional
	public TokenDto generateToken(String email) {
		// RT가 이미 있을 경우
		if(redisService.getValues(email) != null) {
			redisService.deleteValues(email); // 삭제
		}

		// AT, RT 생성 및 Redis에 RT 저장
		TokenDto tokenDto = jwtTokenProvider.createToken(email);
		saveRefreshToken(email, tokenDto.getRefreshToken());
		return tokenDto;
	}

	// RT를 Redis에 저장
	@Transactional
	public void saveRefreshToken(String principal, String refreshToken) {
		redisService.setValuesWithTimeout(principal, // key
			refreshToken, // value
			jwtTokenProvider.getTokenExpirationTime(refreshToken)); // timeout(milliseconds)
	}

	// AT로부터 principal 추출
	public String getPrincipal(String requestAccessToken) {
		return jwtTokenProvider.getAuthentication(requestAccessToken).getName();
	}

	// "Bearer {AT}"에서 {AT} 추출
	public String resolveToken(String requestAccessTokenInHeader) {
		if (requestAccessTokenInHeader != null && requestAccessTokenInHeader.startsWith("Bearer ")) {
			return requestAccessTokenInHeader.substring(7);
		}
		return null;
	}

	// 로그아웃
	@Transactional
	public void logout(String requestAccessTokenInHeader) {
		String requestAccessToken = resolveToken(requestAccessTokenInHeader);
		String principal = getPrincipal(requestAccessToken);

		// Redis에 저장되어 있는 RT 삭제
		String refreshTokenInRedis = redisService.getValues(principal);
		if (refreshTokenInRedis != null) {
			redisService.deleteValues(principal);
		}

		// Redis에 로그아웃 처리한 AT 저장
		redisService.setValuesWithTimeout(requestAccessToken, "logout", 1);
	}

}