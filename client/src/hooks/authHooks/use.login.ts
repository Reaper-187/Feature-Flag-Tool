import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogin } from "@/service/auth.service";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast(`Welcome back ${"🔓"}`);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage = err.response?.data?.message || "Login Failed";
      toast(errorMessage + "🔒");
    },
  });
};
