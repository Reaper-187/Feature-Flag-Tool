import { z } from "zod";

export const formSchema = z.object({
  flagName: z.string(),
  flagKeyName: z.string(),
  description: z.string().optional(),
  flagRollout: z.array(z.number().min(0).max(100)),
  devSwitch: z.boolean(),
  stageSwitch: z.boolean(),
  prodSwitch: z.boolean(),
});

export const registerFormSchema = z.object({
  userName: z.string(),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

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
export interface FormOfNewFlag {
  flagId?: string;
  flagName: string;
  flagKeyName: string;
  description?: string;
  flagRollout: number[];
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;
}
