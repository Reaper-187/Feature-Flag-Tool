import { Router } from "express";
import {
  createFlagController,
  getFlagsController,
  updateFlagController,
} from "./flag.controller";

const router = Router();

router.get("/getFlags", getFlagsController);
router.post("/createFlag", createFlagController);
router.put("/updateFlag", updateFlagController);

export default router;
