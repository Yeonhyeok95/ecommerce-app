package com.goldoogi.back_app.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.goldoogi.back_app.entity.PostEntity;

public interface PostRepository extends JpaRepository<PostEntity, UUID> {
    boolean existsByPostId(String postId);

    @Query(value = "SELECT COUNT(*) FROM posts", nativeQuery = true)
    long countPosts();

    @Query(value = "SELECT id FROM posts ORDER BY created_at ASC LIMIT ?1", nativeQuery = true)
    List<UUID> findOldPostByDate(int limit);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM posts WHERE id IN (SELECT id FROM posts ORDER BY created_at ASC LIMIT ?1)", nativeQuery = true)
    void deleteOldPosts(int limit);

    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE posts_id_seq RESTART WITH 1", nativeQuery = true)
    void resetPrimaryKeySequence();
}
