import { Request, Response } from "express";
import {
  emailVerify,
  loginAuth,
  registAuth,
  resendEmail,
} from "./auth.service";
import { AppError } from "../../utils/appError.utils";

export const loginAuthController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("email and password are required", 400);
  }

  const result = await loginAuth(email, password);

  return res.status(200).json({
    success: true,
    ...result,
  });
};

export const registAuthController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  const registResult = await registAuth({ name, email, password });

  return res.status(201).json({
    success: true,
    ...registResult,
    message:
      "Registration successfully - Please check your inbox for the verification.",
  });
};

export const emailVerifyController = async (req: Request, res: Response) => {
  const token = req.query.token;

  if (!token || typeof token !== "string") {
    throw new AppError("Invalid or missing token", 400);
  }

  await emailVerify(token);

  return res.status(200).json({
    success: true,
    message: "Email verification successful",
  });
};

export const resendEmailVerifyController = async (
  req: Request,
  res: Response,
) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError("Invalid or missing credentials", 400);
  }

  await resendEmail(email);

  return res.status(200).json({
    success: true,
    message: "please check your inbox",
  });
};
