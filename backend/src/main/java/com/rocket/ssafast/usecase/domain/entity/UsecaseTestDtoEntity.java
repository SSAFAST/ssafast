package com.rocket.ssafast.usecase.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "usecase_test_dto")
public class UsecaseTestDtoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "usecase_test_id")
	UsecaseTestEntity usecaseTestEntity;

	@Column(name = "dto_id")
	Long dtoId;
}
