package com.goldoogi.back_app.dto.request.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {
    
    @NotBlank @Email
    private String email;
    @NotBlank @Size(min=8,max = 20)
    private String password;
    @NotBlank
    private String nickname;
    @NotBlank @Pattern(regexp = "^[0-9]{10,13}$")
    private String telNumber;
    @NotBlank
    private String address;

    private String addressDetail;

    @NotNull @AssertTrue
    private Boolean agreedPersonal;
}
