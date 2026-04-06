import { resendVerifyEmail } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useResendVerifyEmail = () => {
  return useMutation({
    mutationFn: resendVerifyEmail,
    onSuccess: (data) => {
      toast.success(data.message || "Email sent successfully!");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage =
        err.response?.data?.message || "Resend to your email failed";
      toast.error(errorMessage + " 🔒");
    },
  });
};
