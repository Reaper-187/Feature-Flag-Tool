export const SWITCH_FIELDS = [
  "devSwitch",
  "stageSwitch",
  "prodSwitch",
] as const;
export type SwitchField = (typeof SWITCH_FIELDS)[number];

export const FILTER_OPTIONS = [
  { label: "Reset Filter", value: "", onClick: "reset" },
  { label: "Active Development", value: "devSwitch" },
  { label: "Active Staging", value: "stageSwitch" },
  { label: "Active Production", value: "prodSwitch" },
];

export const SORT_OPTIONS = [
  { label: "Reset Sort", value: "", onClick: "reset" },
  { label: "[A-Z]", value: "A-Z" },
  { label: "[Z-A]", value: "Z-A", separator: true },
  { label: "Date up", value: "Date up" },
  { label: "Date down", value: "Date down", separator: true },
];
