package com.goldoogi.back_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goldoogi.back_app.entity.PostEntity;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    boolean existsByPostId(String postId);
}
