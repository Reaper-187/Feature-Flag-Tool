import { useMutation } from "@tanstack/react-query";
import { getEmailVerifyConfirm } from "@/service/auth.service";

export const useEmailVerifyConfirm = () => {
  return useMutation({
    mutationFn: (token: string) => getEmailVerifyConfirm(token),
  });
};
