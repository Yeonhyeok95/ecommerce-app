package com.goldoogi.back_app.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.goldoogi.back_app.common.ResponseCode;
import com.goldoogi.back_app.common.ResponseMessage;
import com.goldoogi.back_app.dto.response.ResponseDto;
import com.goldoogi.back_app.entity.UserEntity;

import lombok.Getter;

@Getter
public class GetSignInUserResponseDto extends ResponseDto {
    
    private String email;
    private String nickname;

    private GetSignInUserResponseDto(UserEntity usereEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = usereEntity.getEmail();
        this.nickname = usereEntity.getNickname();
    }

    public static ResponseEntity<GetSignInUserResponseDto> success(UserEntity userEntity) {
        GetSignInUserResponseDto result = new GetSignInUserResponseDto(userEntity);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }

}
