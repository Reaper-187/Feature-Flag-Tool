import { updateFlag } from "@/service/flag.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flags"] });
      toast.success("Feature Flag successfully updated !");
    },
    onError: (error: Error) => {
      toast.error(`Failed with update: ${error.message}`);
      console.error("Update flag error:", error);
    },
  });
};
