import { Request, Response } from "express";
import { loginAuth, registAuth } from "./auth.service";
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
  });
};
