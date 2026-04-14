import type { FlagData } from "@/types/types";
import type { SwitchField } from "@/constants/flagConstants";

export const filterFlagsBySearch = (flags: FlagData[], searchTerm: string) => {
  const searchLower = searchTerm.toLowerCase();
  return flags.filter((flag) =>
    flag.flagName.toLowerCase().includes(searchLower),
  );
};

export const filterFlagsByType = (flags: FlagData[], filterType: string) => {
  if (!filterType) return flags;

  const switchFields: SwitchField[] = [
    "devSwitch",
    "stageSwitch",
    "prodSwitch",
  ];

  if (switchFields.includes(filterType as SwitchField)) {
    return flags.filter((flag) => flag[filterType as keyof FlagData] === true);
  }

  return flags;
};
