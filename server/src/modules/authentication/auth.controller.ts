import { Request, Response } from "express";
import { registAuth } from "./auth.service";
export const loginAuthController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
  } catch (err) {
    console.error("Error with login:", err);
    res.status(500).json({
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
