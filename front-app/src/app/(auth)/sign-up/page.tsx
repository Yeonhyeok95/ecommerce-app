"use client";

import SignUpFormPage1 from "@/components/SignUpFormPage1";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import SignUpFormPage2 from "@/components/SignUpFormPage2";
import { useState } from "react";
import { FormValues } from "../../../../types/next-auth";

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormValues>({
    email: "",
    password: "",
    nickname: "",
    telNumber: "",
    address: "",
    addressDetail: "",
    agreedPersonal: false,
  });
  const [page, setPage] = useState<1 | 2>(1);

  const handleNextPage = () => {
    setPage(2);
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src="/goldoogi-logo-dolphin.svg"
              fill
              style={{
                objectFit: "contain",
              }}
              alt="goldoogi-log"
            />
          </div>
          <h1 className="text-primary-foreground text-2xl font-bold ">
            Create an account
          </h1>
          <Link className="text-blue-400 hover:underline" href="/sign-in">
            Already have an account? Sign-in
            <FaArrowRight className="inline-block ml-1.5 h-5 w-5" />
          </Link>
        </div>
        <div className="grid gap-6">
          {page === 1 && (
            <SignUpFormPage1
              formData={formData}
              setFormData={setFormData}
              onNext={handleNextPage}
            />
          )}
          {page === 2 && (
            <SignUpFormPage2 formData={formData} setFormData={setFormData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
