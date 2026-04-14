import { fetchFlag } from "@/service/flag.service";
import { useQuery } from "@tanstack/react-query";

export const useFetchFlag = () => {
  const query = useQuery({
    queryKey: ["flags"],
    queryFn: fetchFlag,
  });

  return query;
};
