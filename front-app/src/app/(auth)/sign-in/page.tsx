"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import SignInForm from "@/components/auth/sign-in/SignInForm";

const SignInPage = () => {

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
          <h1 className="text-primary-foreground text-2xl font-bold ">Login</h1>
          <Link className="text-blue-400 hover:underline" href="/sign-up">
            New here? Register this service
            <FaArrowRight className="inline-block ml-1.5 h-5 w-5" />
          </Link>
        </div>
        <div className="gap-6">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
