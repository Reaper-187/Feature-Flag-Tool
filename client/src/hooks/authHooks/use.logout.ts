import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchLogout } from "@/service/auth.service";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();

  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: async () => {
      localStorage.removeItem("accessToken");
      queryClient.removeQueries({ queryKey: ["auth"] });
      navigate("/authentication");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage = err.response?.data?.message || "Logout Failed";
      toast(errorMessage + "🔒");
    },
  });
};
