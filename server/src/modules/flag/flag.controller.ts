import { Request, Response } from "express";
import { createFlag } from "./flag.service";
import { FlagReqData } from "../../types/types";

export const createFlagController = async (req: Request, res: Response) => {
  try {
    const data: FlagReqData = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    if (!data.flagName || !data.flagKeyName || !data.createdBy) {
      return res.status(400).json({
        success: false,
        message: "flagName, flagKeyName and createdBy are required",
      });
    }

    if (
      data.flagName.trim().length === 0 ||
      data.flagKeyName.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "flagName and flagKeyName must not be empty",
      });
    }

    if (
      typeof data.flagRollout !== "number" ||
      data.flagRollout < 0 ||
      data.flagRollout > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "flagRollout must be a number between 0 and 100",
      });
    }

    if (
      typeof data.devSwitch !== "boolean" ||
      typeof data.stageSwitch !== "boolean" ||
      typeof data.prodSwitch !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "Environment switches must be boolean values",
      });
    }

    const createdFlag = await createFlag(data);

    res.status(201).json({
      success: true,
      data: createdFlag,
      message: "Flag created successfully",
    });
  } catch (err) {
    console.error("Error creating flag:", err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
