package com.goldoogi.back_app.service.auth;

import org.springframework.http.ResponseEntity;

import com.goldoogi.back_app.dto.request.auth.SignInRequestDto;
import com.goldoogi.back_app.dto.request.auth.SignUpRequestDto;
import com.goldoogi.back_app.dto.response.auth.SignUpResponseDto;
import com.goldoogi.back_app.dto.response.auth.SignInResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
