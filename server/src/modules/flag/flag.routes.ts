import { Router } from "express";
import {
  createFlagController,
  deleteFlagController,
  getFlagsController,
  updateFlagController,
} from "./flag.controller";
import { tokenAuthCheck } from "../authentication/auth.middleware";
import { roleCheck } from "../../middleware/role.middleware";
import { asyncHandler } from "../../utils/asyncHandler.utils";

const router = Router();

router.get("/getFlags", getFlagsController);

router.post(
  "/createFlag",
  tokenAuthCheck,
  roleCheck("DEV"),
  asyncHandler(createFlagController),
);

router.put(
  "/updateFlag/:flagId",
  tokenAuthCheck,
  asyncHandler(updateFlagController),
);

router.delete(
  `/deleteFlag/:flagId`,
  tokenAuthCheck,
  roleCheck("DEV"),
  asyncHandler(deleteFlagController),
);

export default router;
