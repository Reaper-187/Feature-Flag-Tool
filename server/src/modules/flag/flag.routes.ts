import { Router } from "express";
import { createFlagController, getFlagsController } from "./flag.controller";

const router = Router();

router.get("/getFlags", getFlagsController);
router.post("/createFlag", createFlagController);

export default router;
