import React, { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

const AuthFormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <h2 className="text-center m-0 mb-2">{title}</h2>
      <div className="flex flex-col gap-y-4 gap-x-2 justify-start">{children}</div>
    </>
  );
};

export default AuthFormWrapper;
