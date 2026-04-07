import { Router } from "express";
import {
  getMeController,
  loginAuthController,
  registAuthController,
  emailVerifyConfirmController,
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
import { tokenAuthCheck } from "./auth.middleware";
const router = Router();

router.get("/me", tokenAuthCheck, getMeController);

router.post("/registAuth", registerLimiter, registAuthController);

router.post("/loginAuth", loginLimiter, loginAuthController);

router.get("/verify-email/confirm", emailVerifyConfirmController);

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
