package com.goldoogi.back_app.service;

import org.springframework.http.ResponseEntity;

import com.goldoogi.back_app.dto.request.board.PostBoardRequestDto;
import com.goldoogi.back_app.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
}
