import React, { FormEvent, ReactElement, useState } from "react";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import Button from "../../Button";
import SignUpPage1 from "./SignUpPage1";
import SignUpPage2 from "./SignUpPage2";
import { SignUpFormValues } from "@/types/auth/signUpFormValues";
import { signUpRequestDto } from "@/apis";

const SignUpForm = () => {
  const [data, setData] = useState<SignUpFormValues>({
    email: "",
    password: "",
    nickname: "",
    telNumber: "",
    address: "",
    addressDetail: "",
    agreedPersonal: false,
  });
  function updatedFields(fields: Partial<SignUpFormValues>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, steps, currentStepIndex, isFirstStep, back, next, isLastStep } = useMultiStepForm([
    <SignUpPage1 {...data} updatedFields={updatedFields} />,
    <SignUpPage2 {...data} updatedFields={updatedFields} />,
  ]);
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    await signUpRequestDto(data);
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex justify-end">
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
      <div className="mt-1 flex gap-1 justify-end">
        {!isFirstStep && (
          <Button onClick={back} color="primary" size="sm">
            Back
          </Button>
        )}
        <Button type="submit" color={"primary"} size={"sm"}>
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
