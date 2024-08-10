import { SignUpRequestDto, SignInRequestDto } from "./request/auth/index";
import ResponseDto from "./response/response.dto";
import { SignInResponseDto } from "./response/auth";
import { GetSignInUserResponseDto } from "./response/user";
import { createCookie } from "@/hooks/useCustomCookie";

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
      createCookie("accessToken", responseBody.token);
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

export const getSignInUserRequest = async (accessToken: string) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseBody: GetSignInUserResponseDto = await response.json();
      return responseBody;
    } else {
      const responseBody: ResponseDto = await response.json();
      return responseBody
    }
  } catch (error) {
    console.error("An error occurred while fetching the user data:", error);
    return null;
  }
};