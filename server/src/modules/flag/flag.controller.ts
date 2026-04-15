import { Request, Response } from "express";
import { createFlag, deleteFlag, getFlags, updateFlag } from "./flag.service";
import { FlagData, FlagReqData } from "../../types/types";

export const getFlagsController = async (req: Request, res: Response) => {
  try {
    const fetchedFlags = await getFlags();

    res.status(200).json({
      success: true,
      data: fetchedFlags,
      message: "Flag created successfully",
    });
  } catch (err) {
    console.error("Error fetching flags:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createFlagController = async (req: Request, res: Response) => {
  try {
    const data: FlagReqData = req.body;

    const createdBy = req.user?.user_id;
    const flagRollout = Number(data.flagRollout);

    if (!createdBy) return;

    const formatedData = {
      ...data,
      flagRollout,
      createdBy,
    };

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    if (!data.flagName || !data.flagKeyName) {
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

    if (flagRollout < 0 || flagRollout > 100) {
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

    const createdFlag = await createFlag(formatedData);

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

export const updateFlagController = async (req: Request, res: Response) => {
  try {
    const {
      flagId,
      flagName,
      flagRollout,
      description,
      devSwitch,
      stageSwitch,
      prodSwitch,
    } = req.body;

    if (!flagId || !flagName || flagRollout === undefined) {
      return res.status(400).json({
        success: false,
        message: "flagId, flagName and flagRollout are required",
      });
    }

    if (
      typeof flagRollout !== "number" ||
      flagRollout < 0 ||
      flagRollout > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "flagRollout must be a number between 0 and 100",
      });
    }

    if (
      typeof devSwitch !== "boolean" ||
      typeof stageSwitch !== "boolean" ||
      typeof prodSwitch !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "Environment switches must be boolean",
      });
    }

    const convertedData: FlagData = {
      flag_id: flagId,
      flag_name: flagName,
      flag_rollout: flagRollout,
      description,
      devSwitch,
      stageSwitch,
      prodSwitch,
    };

    const updatedFlag = await updateFlag(convertedData);

    res.status(200).json({
      success: true,
      data: updatedFlag,
      message: "Flag updated successfully",
    });
  } catch (err) {
    console.error("Error updating flag:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteFlagController = async (req: Request, res: Response) => {
  try {
    //akt. test --- später auf req.params wechsel weil id soll über url gehen nicht body ----
    const { flagId: flag_id } = req.body;

    if (
      !flag_id ||
      typeof flag_id !== "string" ||
      flag_id.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "flagId is required",
      });
    }

    const deletedFlag = await deleteFlag(flag_id);

    res.status(200).json({
      success: true,
      data: deletedFlag,
      message: "Flag deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting flag:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
