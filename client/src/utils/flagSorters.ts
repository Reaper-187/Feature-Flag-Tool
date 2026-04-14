import type { FlagData } from "@/types/types";

export const sortFlags = (flags: FlagData[], sortType: string): FlagData[] => {
  if (!sortType) return flags;

  const sorted = [...flags];

  switch (sortType) {
    case "A-Z":
      return sorted.sort((a, b) => a.flagName.localeCompare(b.flagName));
    case "Z-A":
      return sorted.sort((a, b) => b.flagName.localeCompare(a.flagName));
    case "Date up":
      return sorted.sort((a, b) => (b.createdDate || 0) - (a.createdDate || 0));
    case "Date down":
      return sorted.sort((a, b) => (a.createdDate || 0) - (b.createdDate || 0));
    default:
      return flags;
  }
};
