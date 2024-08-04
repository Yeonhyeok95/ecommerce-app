package com.goldoogi.back_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goldoogi.back_app.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    boolean existsByTelNumber(String telNumber);
    
    UserEntity findByEmail(String email);
}
