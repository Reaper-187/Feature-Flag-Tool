import type { FlagData, FormOfNewFlag } from "@/types/types";
import { api } from "./api";

const FETCH_FLAG = import.meta.env.VITE_API_FETCH_FLAG;
const CREATE_FLAG = import.meta.env.VITE_API_CREATE_FLAG;
const DELETE_FLAG = import.meta.env.VITE_API_DELETE_FLAG;
const UPDATE_FLAG = import.meta.env.VITE_API_UPDATE_FLAG;
const BATCH_UPDATE_SWITCHES = import.meta.env.VITE_API_BATCH_UPDATE_SWITCHES;

export const fetchFlag = async (): Promise<FlagData[]> => {
  const response = await api.get<{ success: boolean; data: FlagData[] }>(
    FETCH_FLAG,
    {
      withCredentials: true,
    },
  );
  // wegen axios ist format [[data]] daher data.data
  return response.data.data;
};

export const createFlag = async (
  data: FormOfNewFlag,
): Promise<FormOfNewFlag> => {
  const response = await api.post<FormOfNewFlag>(CREATE_FLAG, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteFlag = async (flagId: string) => {
  const response = await api.delete(`${DELETE_FLAG}/${flagId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateFlag = async ({
  flagId,
  ...data
  // das & ist eine combi von zwei Obj-Typen
}: FormOfNewFlag & { flagId: string }): Promise<FormOfNewFlag> => {
  const response = await api.put<FormOfNewFlag>(
    `${UPDATE_FLAG}/${flagId}`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export interface QuickChangeSwitches {
  flagId: string;
  devSwitch?: boolean;
  stageSwitch?: boolean;
  prodSwitch?: boolean;
}

export const batchUpdateSwitches = async (
  changes: QuickChangeSwitches[],
): Promise<void> => {
  const response = await api.patch(BATCH_UPDATE_SWITCHES, changes, {
    withCredentials: true,
  });
  return response.data;
};
