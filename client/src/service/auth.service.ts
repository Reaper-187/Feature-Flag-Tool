import { api } from "./api";

const LOGIN_API = import.meta.env.VITE_API_LOGIN;
const ME_API = import.meta.env.VITE_API_ME;
const REGISTER_API = import.meta.env.VITE_API_REGISTER;
const LOGOUT_API = import.meta.env.VITE_API_LOGOUT;
// const GUEST_ACCESS_API = import.meta.env.VITE_API_GUEST_ACCESS;
// const FORGOTPW_API = import.meta.env.VITE_API_FORGOTPW;
// const VERIFYOTP_API = import.meta.env.VITE_API_VERIFYOTP;
// const RESET_USER_PW_API = import.meta.env.VITE_API_RESETUPW;
// const CHANGE_PW_API = import.meta.env.VITE_API_CHANGEPW;

export type ApiMessage = { message: string; accessToken: string };

export type UserLoginProps = {
  email: string | undefined;
  password: string | undefined;
};

export const fetchLogin = async (data: UserLoginProps): Promise<ApiMessage> => {
  const response = await api.post<ApiMessage>(LOGIN_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export type UserRegisterProps = {
  userName: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

export const fetchRegister = async (
  data: UserRegisterProps,
): Promise<ApiMessage> => {
  const response = await api.post<ApiMessage>(REGISTER_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export type MeInfo = {
  user_id: string;
  email: string;
  name: string;
  role: "DEV" | "ADMIN";
};

export const fetchMeInfo = async (): Promise<MeInfo> => {
  const response = await api.get<MeInfo>(ME_API, {
    withCredentials: true,
  });

  return response.data;
};

export const fetchLogout = async () => {
  const response = await api.post(
    LOGOUT_API,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};
