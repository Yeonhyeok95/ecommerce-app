package com.goldoogi.back_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goldoogi.back_app.entity.DCUserEntity;

public interface DCUserRepository extends JpaRepository<DCUserEntity, Long> {
}
