import { api } from "./api";

const LOGIN_API = import.meta.env.VITE_API_LOGIN;
const ME_API = import.meta.env.VITE_API_ME;
const REGISTER_API = import.meta.env.VITE_API_REGISTER;
const LOGOUT_API = import.meta.env.VITE_API_LOGOUT;
const RESEND_EMAIL = import.meta.env.VITE_API_RESEND_EMAIL;
const VERIFY_EMAIL = import.meta.env.VITE_API_VERIFY_EMAIL;
const FORGOTPW_API = import.meta.env.VITE_API_FORGOTPW;
const RESET_PW = import.meta.env.VITE_API_RESET_PW;
const GUEST_ACCESS_API = import.meta.env.VITE_API_GUEST_ACCESS;

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

type ResRegistApiMessage = {
  user_email: string;
  message: string;
};

export const fetchRegister = async (
  data: UserRegisterProps,
): Promise<ResRegistApiMessage> => {
  const response = await api.post<ResRegistApiMessage>(REGISTER_API, data, {
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

type ResendVerifyEmailPayload = {
  email: string;
};

type ResFromVerifyEmail = {
  message: string;
};

export const resendVerifyEmail = async (
  payload: ResendVerifyEmailPayload,
): Promise<ResFromVerifyEmail> => {
  const response = await api.post<ResFromVerifyEmail>(RESEND_EMAIL, payload, {
    withCredentials: true,
  });

  return response.data;
};

export type EmailVerifyResponse = {
  success: boolean;
  message: string;
};

export const getEmailVerifyConfirm = async (
  token: string,
): Promise<EmailVerifyResponse> => {
  const response = await api.get<EmailVerifyResponse>(
    `${VERIFY_EMAIL}?token=${token}`,
  );

  return response.data;
};

export type ForgotPwCred = {
  email: string;
  message?: string;
};

export const forgotPw = async (data: ForgotPwCred): Promise<ForgotPwCred> => {
  const response = await api.post<ForgotPwCred>(FORGOTPW_API, data, {
    withCredentials: true,
  });

  return response.data;
};

export type ResetPw = {
  newPassword: string;
  token: string;
};

export const resetPw = async (data: ResetPw): Promise<ApiMessage> => {
  const response = await api.post<ApiMessage>(RESET_PW, data, {
    withCredentials: true,
  });

  return response.data;
};

export const guestLogin = async () => {
  const response = await api.post<ApiMessage>(
    GUEST_ACCESS_API,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};
