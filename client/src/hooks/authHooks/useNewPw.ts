import { resetPw } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useNewPw = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPw,
    onSuccess: () => {
      toast("Password successfully reset. You can now log in.");
      navigate("/authentication");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage =
        err.response?.data?.message || "Password reset failed";
      toast(errorMessage + "🔒");
    },
  });
};
