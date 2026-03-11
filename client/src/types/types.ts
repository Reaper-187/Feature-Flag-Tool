import { ChartNetwork, RefreshCcw, TestTubeDiagonal } from "lucide-react";
import { z } from "zod";

export const formSchema = z.object({
  flagName: z.string(),
  flagKeyName: z.string(),
  description: z.string().optional(),
  flagRollout: z.number().min(0).max(100).array(),
  devSwitch: z.boolean(),
  stageSwitch: z.boolean(),
  prodSwitch: z.boolean(),
});

export type FormOfNewFlag = z.infer<typeof formSchema>;

export interface FlagData {
  flagId: string;
  flagName: string;
  flagKeyName: string;
  flagRollout: number;
  description: string;
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;

  createdBy: string;
  createdDate: number;
}
