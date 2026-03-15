import { Router } from "express";
import { loginAuthController, registAuthController } from "./auth.controller";
const router = Router();

router.post("/registAuth", registAuthController);

router.post("/loginAuth", loginAuthController);
export default router;
