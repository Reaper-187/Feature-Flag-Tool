import { Request, Response } from "express";
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
