import type { FlagData, FormOfNewFlag } from "@/types/types";
import { api } from "./api";

const FETCH_FLAG = import.meta.env.VITE_API_FETCH_FLAG;
const CREATE_FLAG = import.meta.env.VITE_API_CREATE_FLAG;
const UPDATE_FLAG = import.meta.env.VITE_API_UPDATE_FLAG;
const DELETE_FLAG = import.meta.env.VITE_API_DELETE_FLAG;

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
