import { Router } from "express";
import { loginAuthController } from "./auth.controller";
const router = Router();

router.post("/loginAuth", loginAuthController);
export default router;
