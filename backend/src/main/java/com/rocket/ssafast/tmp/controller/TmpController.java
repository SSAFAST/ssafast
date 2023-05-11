package com.rocket.ssafast.tmp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.tmp.domain.TmpOrder;
import com.rocket.ssafast.tmp.domain.TmpUser;
import com.rocket.ssafast.tmp.dto.TmpItemDto;
import com.rocket.ssafast.tmp.dto.TmpOrderDto;
import com.rocket.ssafast.tmp.dto.TmpUserDto;
import com.rocket.ssafast.tmp.service.TmpService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tmp")
@RequiredArgsConstructor
public class TmpController {

	private final TmpService tmpService;

	@PostMapping("/user/{userName}")
	ResponseEntity<?> postUserMethod(@RequestHeader(value = "Authorization") String auth, @RequestBody TmpUserDto tmpUserDto, @RequestParam String pTest, @PathVariable("userName") String userName) {
		System.out.println("/api/tmp/user/사람이름의 쿼리 파람 잘 받았음: "+ pTest);

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Authorization", auth);

		Map<String, List<TmpOrderDto>> result = new HashMap<>();
		result.put("orderList", tmpService.save(tmpUserDto));
		return ResponseEntity.ok().headers(responseHeaders).body(result);
	}

	@PostMapping("/order/{orderId}")
	ResponseEntity<?> postItemsMethod(@RequestBody Map<String, List<TmpItemDto>> orderItemList, @RequestParam String orderNum, @PathVariable("orderId") Long orderId) {
		System.out.println("/api/tmp/order/주문id?주문번호: "+ orderNum);
		Map<String, List<TmpItemDto>> result = new HashMap<>();
		result.put("orderItemList", tmpService.saveOrderItems(orderId, orderItemList.get("orderItemList")));
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/item/{itemId}")
	ResponseEntity<?> getItemsMethod(@PathVariable("itemId") Long itemId) {
		System.out.println("/api/tmp/item/itemid: "+ itemId);
		Map<String, TmpItemDto> result = new HashMap<>();
		result.put("orderItem", tmpService.getOrderItems(itemId));
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
