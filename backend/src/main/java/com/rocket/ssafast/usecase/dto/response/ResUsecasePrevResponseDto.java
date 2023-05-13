package com.rocket.ssafast.usecase.dto.response;

import java.util.List;

import com.rocket.ssafast.apispec.domain.Document.element.Body;
import com.rocket.ssafast.apispec.domain.Document.element.HeaderField;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResUsecasePrevResponseDto {

	Long apiId;

	String apiName;

	String desc;

	private List<HeaderField> headers;

	private Body body;
}
