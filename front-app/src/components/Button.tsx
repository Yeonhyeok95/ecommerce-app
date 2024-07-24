import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type Color = "primary" | "auxilary";
type Size = "sm" | "lg";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  color: Color;
  size: Size;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Button = ({
  type,
  color,
  size,
  className,
  onClick,
  children,
}: ButtonProps) => {
  let colorClassName = "";
  let sizeClassName = "";
  let additionalClassName = className;

  switch (color) {
    case "primary":
      {
        colorClassName =
          "text-white hover:bg-primary/80 bg-primary focus:ring-4 focus:ring-primary-300 rounded-lg focus:outline-none";
      }
      break;
    case "auxilary":
      {
        colorClassName =
          "text-white bg-blue-400 hover:bg-blue-400/80 focus:ring-4 focus:ring-red-300 rounded-lg focus:outline-none";
      }
      break;
  }

  switch (size) {
    case "sm":
      {
        sizeClassName = "px-5 py-2.5 my-2 text-sm";
      }
      break;

    case "lg":
      {
        sizeClassName = "px-2 py-1 my-2";
      }
      break;
  }

  return (
    <button
      type={type ? type : "submit"}
      className={cn(colorClassName, sizeClassName, additionalClassName)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;