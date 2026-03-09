export interface FlagReqData {
  flagName: string;
  flagKeyName: string;
  description?: string;
  flagRollout: number;
  createdBy: string;
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;
}

export interface FlagData {
  flag_id: string;
  flag_name: string;
  flag_rollout: number;
  description?: string;
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;
}
