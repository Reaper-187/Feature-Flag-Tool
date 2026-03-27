import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/token.utils";

export function tokenAuthCheck(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (!accessToken.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = accessToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
