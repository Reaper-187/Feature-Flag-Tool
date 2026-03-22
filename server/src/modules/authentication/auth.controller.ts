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

// exports.emailVerify = async (req: Request, res: Response) => {
//   const { token } = req.query;

//     // Benutzer mit dem Token finden
//     const user = await User.findOne({ "verfication.verificationToken": token });

//     if (!user) {
//       return res.status(400).send("Token is wrong or expired.");
//     }

//     if (user.verfication.verifyTokenExp < Date.now()) {
//       return res.status(400).send("Token is wrong or expired.");
//     }

//     // Benutzer verifizieren
//     user.verfication.isVerified = true;
//     user.verfication.verificationToken = null; // Token entfernen
//     user.verfication.verifyTokenExp = null; // Ablaufdatum entfernen
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "E-Mail verified successfully! Now you can Sign-in.",
//     });
// };
