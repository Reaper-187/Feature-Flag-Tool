import { Router } from "express";
import {
  createFlagController,
  deleteFlagController,
  getFlagsController,
  updateFlagController,
} from "./flag.controller";
import { tokenAuthCheck } from "../authentication/auth.middleware";
import { roleCheck } from "../../middleware/role.middleware";

const router = Router();

router.get("/getFlags", getFlagsController);
router.post(
  "/createFlag",
  tokenAuthCheck,
  roleCheck("ADMIN"),
  createFlagController,
);
router.put("/updateFlag", tokenAuthCheck, updateFlagController);
router.put(
  "/deleteFlag",
  tokenAuthCheck,
  roleCheck("ADMIN"),
  deleteFlagController,
);

export default router;
