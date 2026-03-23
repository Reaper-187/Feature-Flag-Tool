import { Router } from "express";
import {
  loginAuthController,
  registAuthController,
  emailVerifyController,
} from "./auth.controller";
const router = Router();

router.post("/registAuth", registAuthController);

router.post("/loginAuth", loginAuthController);

router.get("/emailVerify", emailVerifyController);
export default router;
