import { Router } from "express";
import {
  createFlagController,
  deleteFlagController,
  getFlagsController,
  updateFlagController,
} from "./flag.controller";

const router = Router();

router.get("/getFlags", getFlagsController);
router.post("/createFlag", createFlagController);
router.put("/updateFlag", updateFlagController);
router.delete("/deleteFlag", deleteFlagController);

export default router;
