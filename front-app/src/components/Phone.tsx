import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
  className: string;
}

const Phone = ({ imgSrc, className, dark = false }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="pointer-events-none z-50 select-none"
      />

      <div className="absolute -bottom-20 -z-10 inset-0">
        <img src={imgSrc} className="object-cover min-w-full min-h-full" />
      </div>
    </div>
  );
};

export default Phone;