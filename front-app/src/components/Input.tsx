import { cn } from "@/lib/utils";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/next-auth";

interface InputProps {
  label: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  placeholder: string;
  labelClassName?: string;
  inputClassName?: string;
  errors?: FieldErrors<FormValues>;
}

const Input = ({
  label,
  register,
  placeholder,
  labelClassName,
  inputClassName,
  errors,
}: InputProps) => {
  const defaultLabelClassName =
    "block pb-1 text-sm font-medium leading-6 text-gray-900";
  const defaultInputClassName =
    "block w-full rounded-md pl-2 py-1.5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none text-sm leading-6";
  const inputPattern: { [key: string]: { value: RegExp; message: string } } = {
    email: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Email format is invalid.",
    },
    password: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        "Password must be minimum 8 characters, at least one letter, one number and one special character.",
    },
    username: {
      value: /^[a-zA-Z ]*$/,
      message: "Only alphabets and space can be accepted.",
    },
  };

  function validator(label: string) {
    if (inputPattern[label]) {
      return {
        required: true,
        pattern: inputPattern[label],
      };
    }
  }

  return (
    <>
      <label className={cn(defaultLabelClassName, labelClassName)}>
        {label}
      </label>
      <input
        className={cn(defaultInputClassName, inputClassName)}
        {...register(label, validator(label))}
        placeholder={placeholder}
      />
      {errors?.[label]?.message && (
        <p className="text-red-500 text-xs mb-2">{errors[label].message}</p>
      )}
    </>
  );
};

export default Input;