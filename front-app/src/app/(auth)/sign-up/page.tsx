"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import SignUpForm from "@/components/auth/sign-up/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[max-content]">
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
          <h1 className="text-primary-foreground text-2xl font-bold ">Create an account</h1>
          <Link className="text-blue-400 hover:underline" href="/sign-in">
            Already have an account? Sign-in
            <FaArrowRight className="inline-block ml-1.5 h-5 w-5" />
          </Link>
        </div>
        <div className="gap-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
