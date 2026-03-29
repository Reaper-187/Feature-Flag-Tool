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
  roleCheck("ADMIN"),
  asyncHandler(createFlagController),
);
router.put("/updateFlag", tokenAuthCheck, asyncHandler(updateFlagController));
router.delete(
  "/deleteFlag",
  tokenAuthCheck,
  roleCheck("ADMIN"),
  asyncHandler(deleteFlagController),
);

export default router;
