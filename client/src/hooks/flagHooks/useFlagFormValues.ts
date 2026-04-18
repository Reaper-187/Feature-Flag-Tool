import { useFetchFlags } from "./use.fetchFlag";

export const useFlagFormValues = (flagId?: string) => {
  const { data: flags, isLoading } = useFetchFlags();

  const flagData =
    flagId && flags ? flags.find((f) => f.flagId === flagId) : undefined;

  // Konvertiere FlagData zu FormOfNewFlag
  const formValues = flagData
    ? {
        flagId: flagData.flagId,
        flagName: flagData.flagName,
        flagKeyName: flagData.flagKeyName,
        flagRollout: [flagData.flagRollout], // number → number[]
        description: flagData.description,
        devSwitch: flagData.devSwitch,
        stageSwitch: flagData.stageSwitch,
        prodSwitch: flagData.prodSwitch,
      }
    : undefined;

  return {
    initialValues: formValues,
    isLoading,
  };
};
