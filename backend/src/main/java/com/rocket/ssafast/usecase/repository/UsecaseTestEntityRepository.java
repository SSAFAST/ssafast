package com.rocket.ssafast.usecase.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.usecase.domain.entity.UsecaseTestEntity;

public interface UsecaseTestEntityRepository extends JpaRepository<UsecaseTestEntity, Long> {
}
