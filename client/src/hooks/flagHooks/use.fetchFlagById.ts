import { useFetchFlags } from "./use.fetchFlag";

export const useFetchFlagById = (flagId?: string) => {
  const { data: flags, isLoading, ...rest } = useFetchFlags();

  const flag =
    flagId && flags ? flags.find((f) => f.flagId === flagId) : undefined;

  return {
    data: flag,
    isLoading: isLoading && !!flagId,
    ...rest,
  };
};
