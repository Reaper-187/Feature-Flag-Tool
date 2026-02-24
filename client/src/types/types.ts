import { ChartNetwork, RefreshCcw, TestTubeDiagonal } from "lucide-react";
import { z } from "zod";

export const formSchema = z.object({
  flagName: z.string(),
  flagKeyName: z.string(),
  description: z.string().optional(),
  flagType: z.string(),
  flagRollout: z.number().min(0).max(100).array(),
});

export type FormOfNewFlag = z.infer<typeof formSchema>;

export interface FlagData {
  flagId: string;
  flagName: string;
  createdBy: string;
  createdDate: number;
  type: string;
  devSwtich: boolean;
  stageSwtich: boolean;
  prodSwtich: boolean;
}

export type FlagType = "Update" | "Analytics" | "Test";

export const flagTypes: {
  value: string;
  label: FlagType;
  icon: React.ElementType;
}[] = [
  { value: "update", label: "Update", icon: RefreshCcw },
  { value: "analytics", label: "Analytics", icon: ChartNetwork },
  { value: "test", label: "Test", icon: TestTubeDiagonal },
];
