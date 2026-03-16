import { Request, Response } from "express";
import { loginAuth, registAuth } from "./auth.service";

export const loginAuthController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const loginResult = await loginAuth(email, password);

    return res.status(200).json({
      success: true,
      data: loginResult,
    });
  } catch (err: any) {
    if (err.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.error("Error with login:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const registAuthController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const registResult = await registAuth({ name, email, password });

    return res.status(201).json({
      success: true,
      data: registResult,
    });
  } catch (err: any) {
    if (err.message === "INVALID: User already exist") {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    console.error("Error with registration:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
