import { Dispatch, FC, SetStateAction } from "react";
import { FormValues } from "../../types/next-auth";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { CiCircleCheck } from "react-icons/ci";

interface SignUpFormPage2Props {
  formData: FormValues;
  setFormData: Dispatch<SetStateAction<FormValues>>;
}

const SignUpFormPage2: FC<SignUpFormPage2Props> = ({ formData, setFormData }: SignUpFormPage2Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, ...data };
      console.log("Final Form Data:", updatedFormData);
      return updatedFormData;
    });
  };

  const onAgreedPersonalClickHandler = () => {
    setFormData((prev) => ({ ...prev, agreedPersonal: !prev.agreedPersonal }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Input register={register} label="Nickname" placeholder="nickname" inputValue="nickname" labelClassName="" inputClassName="" errors={errors} />
      <Input register={register} label="Phone Number" placeholder="010-1234-5678" inputValue="telNumber" labelClassName="" inputClassName="" errors={errors} />
      <Input register={register} label="Address" placeholder="Address" inputValue="address" labelClassName="" inputClassName="" errors={errors} />
      <Input register={register} label="Address Detail" placeholder="Address Detail" inputValue="addressDetail" labelClassName="" inputClassName="" errors={errors} />
      <div className="flex gap-1.5 items-center text-left cursor-pointer" onClick={onAgreedPersonalClickHandler} >
        <CiCircleCheck className={`${formData.agreedPersonal ? "text-primary" : "text-primary-foreground"} h-5 w-5 shrink-0 `} />
        {`${formData.agreedPersonal ? "Registered!" : "Register to get fun posts!"}`}
      </div>
      <Button type="submit" color="primary" size="lg">
        Complete Sign Up
      </Button>
    </form>
  );
};

export default SignUpFormPage2;
