import { deleteFlag } from "@/service/flag.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flags"] });
      toast.success("Feature Flag successfully deleted !");
    },
    onError: (error: Error) => {
      toast.error(`error: on deleting this Flag: ${error.message}`);
      console.error("Delete flag error:", error);
    },
  });
};
