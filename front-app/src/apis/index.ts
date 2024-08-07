import React from "react";
import { SignUpRequestDto, SignInRequestDto } from "../apis/request/auth/index";
import ResponseDto from "./response/response.dto";
import { SignInResponseDto } from "./response/auth";

export const signInRequestDto = async (requestBody: SignInRequestDto) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const responseBody: SignInResponseDto = await response.json();
      return responseBody;
    } else {
      const errorResponseBody: ResponseDto = await response.json();
      return errorResponseBody;
    }
  } catch (e) {
    console.log("Error occured during sign-in: ", e);
    return;
  }
};

export const signUpRequestDto = async (requestBody: SignUpRequestDto) => {
  const response = await fetch("http://localhost:8080/api/v1/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    console.log(requestBody);
    alert("Sign-up successful!");
  } else {
    console.log(requestBody);
    alert("Sign-up failed. Please try again.");
  }
};
