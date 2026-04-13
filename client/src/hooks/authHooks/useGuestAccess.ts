import { useMutation, useQueryClient } from "@tanstack/react-query";
import { guestLogin } from "@/service/auth.service";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const guestAccessHook = () => {
  const qeryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: guestLogin,
    onSuccess: async (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      await qeryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/dashboard");
      toast("Welcome Guest");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage = err.response?.data?.message || "Guest-Login Failed";
      toast(errorMessage + "🔒");
    },
  });
};
