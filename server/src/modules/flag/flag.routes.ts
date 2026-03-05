import { Router } from "express";
import { createFlagController } from "./flag.controller";

const router = Router();

router.post("/createFlag", createFlagController);

export default router;
