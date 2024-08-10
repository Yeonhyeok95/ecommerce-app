package com.goldoogi.back_app.service;

import org.springframework.http.ResponseEntity;
import com.goldoogi.back_app.dto.response.user.GetSignInUserResponseDto;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    
}
