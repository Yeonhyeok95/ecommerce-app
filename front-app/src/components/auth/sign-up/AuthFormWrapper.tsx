import React, { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

const AuthFormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <h2 className="text-center m-0 mb-2">{title}</h2>
      <div className="grid gap-y-4 gap-x-2 justify-start grid-cols-[auto_minmax(auto,_400px)]">{children}</div>
    </>
  );
};

export default AuthFormWrapper;
