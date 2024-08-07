import React from "react";
import AuthFormWrapper from "./AuthFormWrapper";
import { SignUpFormValues } from "../../../types/auth/signUpFormValues";

type SignUpPage1Props = {
  email: string;
  password: string;
  updatedFields: (fields: Partial<SignUpFormValues>) => void;
};

export default function SignUpPage1({ email, password, updatedFields }: SignUpPage1Props) {
  return (
    <AuthFormWrapper title="Email Validation Check">
      <label className="">Email</label>
      <input
        className=""
        autoFocus
        required
        type="email"
        value={email}
        onChange={(e) => updatedFields({ email: e.target.value })}
      ></input>
      <label className="">Password</label>
      <input
        className=""
        required
        type="password"
        value={password}
        onChange={(e) => updatedFields({ password: e.target.value })}
      ></input>
    </AuthFormWrapper>
  );
}
