import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.utils";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    code: "UNKNOWN_ERROR",
  });
}
