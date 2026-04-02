import { fetchMeInfo } from "@/service/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchMeInfo,
    retry: false,
  });
};
