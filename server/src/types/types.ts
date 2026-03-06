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
  flagId: string;
  flagName: string;
  flagKeyName: string;
  flagRollout: number;
  description: string;
  createdBy: string;
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;
  createdDate: number;
}
