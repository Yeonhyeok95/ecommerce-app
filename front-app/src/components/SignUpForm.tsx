import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { FormValues } from "../../types/next-auth";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Input
        register={register}
        placeholder="email@email.com"
        label="email"
        labelClassName=""
        inputClassName=""
        errors={errors}
      />
      <Input
        register={register}
        placeholder="P!ssw0rd"
        label="password"
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

export default SignUpForm;