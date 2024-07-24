"use client";

import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const page = () => {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <img src="/goldoogi-logo-dolphin.svg" className="w-20 h-20" />{" "}
          <h1 className="text-primary-foreground text-2xl font-bold ">
            Create an account
          </h1>
          <Link className="text-blue-400 hover:underline" href="/sign-in">
            Already have an account? Sign-in
            <FaArrowRight className="inline-block ml-1.5 h-5 w-5" />
          </Link>
        </div>
        <div className="grid gap-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default page;