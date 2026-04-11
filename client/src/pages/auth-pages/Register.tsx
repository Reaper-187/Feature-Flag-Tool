import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/authHooks/use.register";
import { registerFormSchema } from "@/types/types";
// import { guestAccessHook } from "@/hooks/AuthHooks/useGuestAccess";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type FormRegister = z.infer<typeof registerFormSchema>;

type Props = {
  onSwitch: () => void;
};

export const Register = ({ onSwitch }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormRegister>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending: registLoad } = useRegister();

  // const { mutate: guestLogin, isPending: guestLoginLoad } = guestAccessHook();

  const handleRegister = (data: FormRegister) => {
    mutate(data);
  };

  const noCheck = registLoad; /* || guestLoginLoad */

  const checkPasswordCriteria = (password: string = "") => {
    return {
      minLength: password.length > 7,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
  };

  const criteriaList = [
    "Minumum characters 8",
    "One uppercase charachter",
    "One lowercase charachter",
    "One number",
    "One speacial charachter",
  ];

  const passwordChecks = checkPasswordCriteria(watch("password"));

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-cover">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-self-center text-2xl md:text-3xl lg:text-4xl">
            Register
          </CardTitle>
          <CardDescription className="text-center">
            Hey, Enter your details to create a Account
          </CardDescription>
        </CardHeader>

        <form
          className="px-5 flex flex-col gap-6"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="space-y-5">
            <div className="flex gap-4">
              <Input
                className="text-red-400"
                type="userName"
                placeholder="Name"
                {...register("userName")}
              />
              {errors.userName && (
                <p className="text-red-300">{errors.userName?.message}</p>
              )}
              <Input
                className="text-red-400"
                type="email"
                placeholder="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <Input
                {...register("password")}
                placeholder="password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {criteriaList.map((criterion, index) => {
              const isMet = Object.values(passwordChecks)[index];
              return (
                <div
                  key={index}
                  className={isMet ? "text-green-500" : "text-gray-500"}
                >
                  <li className="ml-5">{criterion}</li>
                </div>
              );
            })}
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <Button disabled={noCheck ? true : false} className="w-full">
              {noCheck ? "please wait..." : "Registration"}
            </Button>
            <Button type="button" className="w-full" onClick={onSwitch}>
              Switch to Login
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center ">
              <span className="w-full border-t " />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-primary-foreground px-2 text-muted-foreground rounded-md">
                Or continue with
              </span>
            </div>
          </div>
        </form>
        <div className="grid grid-cols-2 gap-4 px-4 ">
          <Button
            className="w-full col-span-2 font-semibold"
            // onClick={() => guestLogin()}
            // disabled={noCheck ? true : false}
          >
            <User className="mr-2 h-4 w-4" />
            {/* {guestLoginLoad ? "Guest-Access is creating..." : "Guest for Test"} */}
            {"Guest for Test"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
