import React from "react";
import AuthFormWrapper from "./AuthFormWrapper";
import { SignUpFormValues } from "../../../types/auth/signUpFormValues";

type SignUpPage2Props = {
  nickname: string;
  telNumber: string;
  address: string;
  addressDetail: string;
  agreedPersonal: Boolean;
  updatedFields: (fields: Partial<SignUpFormValues>) => void;
};

export default function SignUpPage2({
  nickname,
  telNumber,
  address,
  addressDetail,
  agreedPersonal,
  updatedFields,
}: SignUpPage2Props) {
  return (
    <AuthFormWrapper title="User Details">
      <label>Nickname</label>
      <input
        autoFocus
        required
        type="text"
        value={nickname}
        onChange={(e) => updatedFields({ nickname: e.target.value })}
      ></input>
      <label>Phone Number</label>
      <input
        required
        type="tel"
        value={telNumber}
        onChange={(e) => updatedFields({ telNumber: e.target.value })}
      ></input>
      <label>Address</label>
      <input required type="text" value={address} onChange={(e) => updatedFields({ address: e.target.value })}></input>
      <label>Address Detail</label>
      <input
        required
        type="text"
        value={addressDetail}
        onChange={(e) => updatedFields({ addressDetail: e.target.value })}
      ></input>
      <label>{agreedPersonal ? "Registered" : "Register to get fun posts!"}</label>
      <input required type="checkbox" onChange={(e) => updatedFields({ agreedPersonal: e.target.checked })}></input>
    </AuthFormWrapper>
  );
}
