import { Router } from "express";
import {
  loginAuthController,
  registAuthController,
  emailVerifyController,
  resendEmailVerifyController,
  requestPasswordResetController,
  resetPasswordController,
} from "./auth.controller";
const router = Router();

router.post("/registAuth", registAuthController);

router.post("/loginAuth", loginAuthController);

router.get("/verify-email", emailVerifyController);

router.post("/resend-verification", resendEmailVerifyController);

router.post("/request-password-reset", requestPasswordResetController);

router.post("/reset-password", resetPasswordController);
export default router;
