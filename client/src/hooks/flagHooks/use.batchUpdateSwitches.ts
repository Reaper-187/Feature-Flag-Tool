import { useMutation, useQueryClient } from "@tanstack/react-query";
import { batchUpdateSwitches } from "@/service/flag.service";
import { toast } from "sonner";

export const useBatchUpdateSwitches = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchUpdateSwitches,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flags"] });
      toast.success("All switches updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update switches: ${error.message}`);
      console.error("Batch update error:", error);
    },
  });
};
