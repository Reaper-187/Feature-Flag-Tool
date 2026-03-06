export interface FlagReqData {
  flagName: string;
  flagKeyName: string;
  flagRollout: number;
  description?: string;
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;
  createdBy: string;
  createdDate: number;
}
