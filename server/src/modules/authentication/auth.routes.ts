import { Router } from "express";
import {
  loginAuthController,
  registAuthController,
  emailVerifyController,
  resendEmailVerifyController,
  requestPasswordResetController,
  resetPasswordController,
  refreshTokenController,
  logoutController,
} from "./auth.controller";
import {
  loginLimiter,
  refreshLimiter,
  registerLimiter,
  resendVerificationLimiter,
  resetLimiter,
} from "@/middleware/rate-limit.middleware";
const router = Router();

router.post("/registAuth", registerLimiter, registAuthController);

router.post("/loginAuth", loginLimiter, loginAuthController);

router.get("/verify-email", emailVerifyController);

router.post(
  "/resend-verification",
  resendVerificationLimiter,
  resendEmailVerifyController,
);

router.post(
  "/request-password-reset",
  resetLimiter,
  requestPasswordResetController,
);

router.post("/reset-password", resetPasswordController);

router.post("/refresh-token", refreshLimiter, refreshTokenController);

router.post("/logout", logoutController);
export default router;
