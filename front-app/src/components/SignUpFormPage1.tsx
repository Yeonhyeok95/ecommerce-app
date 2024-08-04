import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { FormValues } from "../../types/next-auth";
import { Dispatch, FC, SetStateAction } from "react";

interface SignUpFormPage1Props {
  formData: FormValues;
  setFormData: Dispatch<SetStateAction<FormValues>>;
  onNext: () => void;
}

const SignUpFormPage1: FC<SignUpFormPage1Props> = ({ formData, setFormData, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData((prev: FormValues) => ({ ...prev, ...data }));
    alert(JSON.stringify(data));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Input
        register={register}
        label="Email"
        placeholder="email@email.com"
        inputValue="email"
        labelClassName=""
        inputClassName=""
        errors={errors}
      />
      <Input
        register={register}
        label="Password"
        placeholder="P!ssw0rd"
        inputValue="password"
        labelClassName=""
        inputClassName=""
        errors={errors}
      />
      <Button type="submit" color="primary" size="lg">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpFormPage1;
