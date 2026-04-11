import { fetchMeInfo } from "@/service/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const token = localStorage.getItem("accessToken");

  const query = useQuery({
    queryKey: ["auth"],
    queryFn: fetchMeInfo,
    retry: false,
    enabled: !!token,
  });

  return {
    ...query,
    hasToken: !!token,
  };
};
