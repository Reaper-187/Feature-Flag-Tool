import { useMutation } from "@tanstack/react-query";
import { forgotPw, type ForgotPwCred } from "@/service/auth.service";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useForgotPw = () => {
  return useMutation({
    mutationFn: forgotPw,
    onSuccess: (response: ForgotPwCred) => {
      toast(response.message);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage = err.response?.data?.message;
      toast(errorMessage + "🔒");
    },
  });
};
