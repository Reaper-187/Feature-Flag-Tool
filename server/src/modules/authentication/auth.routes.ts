import { Router } from "express";
import {
  loginAuthController,
  registAuthController,
  emailVerifyController,
  resendEmailVerifyController,
} from "./auth.controller";
const router = Router();

router.post("/registAuth", registAuthController);

router.post("/loginAuth", loginAuthController);

router.get("/verify-email", emailVerifyController);

router.post("/resend-verification", resendEmailVerifyController);
export default router;
