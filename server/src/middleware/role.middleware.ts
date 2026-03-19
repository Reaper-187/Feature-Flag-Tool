import { UserRole } from "../../generated/prisma/enums";
import { NextFunction, Request, Response } from "express";

export function roleCheck(requiredRole: UserRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role } = req.user;

    if (!role) {
      return res.status(403).json({ message: "No role assigned" });
    }

    if (role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
