import { signInRequestDto } from "@/apis";
import Button from "@/components/Button";
import { SignInFormValues } from "@/types/auth/signInFormValues";
import React, { FormEvent, useState } from "react";
import AuthFormWrapper from "../sign-up/AuthFormWrapper";

const SignInForm = () => {
  const [data, setData] = useState<SignInFormValues>({
    email: "",
    password: "",
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    alert("Good");
    await signInRequestDto(data);
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex justify-end flex-col">
        <AuthFormWrapper title="Email validation">
          <label className="">Email</label>
          <input
            className=""
            autoFocus
            required
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
          ></input>
          <label className="">Password</label>
          <input
            className=""
            required
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
          ></input>
        </AuthFormWrapper>
      </div>
      <div className="mt-1 flex gap-1 justify-end">
        <Button type="submit" color={"primary"} size={"sm"}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
