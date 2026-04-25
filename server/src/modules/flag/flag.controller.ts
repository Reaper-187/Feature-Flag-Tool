import { Request, Response } from "express";
import {
  batchUpdateSwitches,
  createFlag,
  deleteFlag,
  getFlags,
  updateFlag,
} from "./flag.service";
import {
  FlagData,
  FlagReqData,
  FlagUpdateData,
  SwitchUpdates,
} from "../../types/types";
import { AppError } from "@/utils/appError.utils";

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
  const data: FlagReqData = req.body;

  const createdBy = req.user?.user_id;
  const flagRollout = Number(data.flagRollout);

  if (!data) {
    throw new AppError("Request body is missing", 400, "MISSING_BODY");
  }

  if (!data.flagName || !data.flagKeyName) {
    throw new AppError(
      "flagName and flagKeyName are required",
      400,
      "MISSING_REQUIRED_FIELDS",
    );
  }

  if (!createdBy) {
    throw new AppError("User not authenticated", 401, "UNAUTHORIZED");
  }

  if (
    data.flagName.trim().length === 0 ||
    data.flagKeyName.trim().length === 0
  ) {
    throw new AppError(
      "flagName and flagKeyName must not be empty",
      400,
      "EMPTY_FIELDS",
    );
  }

  if (flagRollout < 0 || flagRollout > 100) {
    throw new AppError(
      "flagRollout must be a number between 0 and 100",
      400,
      "INVALID_ROLLOUT_RANGE",
    );
  }

  if (
    typeof data.devSwitch !== "boolean" ||
    typeof data.stageSwitch !== "boolean" ||
    typeof data.prodSwitch !== "boolean"
  ) {
    throw new AppError(
      "Environment switches must be boolean values",
      400,
      "INVALID_SWITCH_TYPE",
    );
  }

  const formatedData = {
    ...data,
    flagRollout,
    createdBy,
  };

  const createdFlag = await createFlag(formatedData);

  res.status(201).json({
    success: true,
    data: createdFlag,
    message: "Flag created successfully",
  });
};

export const updateFlagController = async (req: Request, res: Response) => {
  const {
    flagName,
    flagRollout,
    description,
    devSwitch,
    stageSwitch,
    prodSwitch,
  } = req.body;

  const { flagId: flag_id } = req.params;

  if (!flag_id) {
    throw new AppError(
      "flagId is required in URL parameter",
      400,
      "MISSING_FLAG_ID",
    );
  }

  if (!flagName || flagRollout === undefined) {
    throw new AppError(
      "flagName and flagRollout are required",
      400,
      "MISSING_REQUIRED_FIELDS",
    );
  }

  const formatedRollout = Number(flagRollout);
  if (isNaN(formatedRollout)) {
    throw new AppError(
      "flagRollout must be a valid number",
      400,
      "INVALID_ROLLOUT_FORMAT",
    );
  }

  if (formatedRollout < 0 || formatedRollout > 100) {
    throw new AppError(
      "flagRollout must be a number between 0 and 100",
      400,
      "INVALID_ROLLOUT_RANGE",
    );
  }

  if (
    typeof devSwitch !== "boolean" ||
    typeof stageSwitch !== "boolean" ||
    typeof prodSwitch !== "boolean"
  ) {
    throw new AppError(
      "Environment switches must be boolean values",
      400,
      "INVALID_SWITCH_TYPE",
    );
  }

  const convertedData: FlagUpdateData = {
    flag_name: flagName,
    flag_rollout: formatedRollout,
    description,
    devSwitch,
    stageSwitch,
    prodSwitch,
  };

  const updatedFlag = await updateFlag(flag_id as string, convertedData);

  if (!updatedFlag) {
    throw new AppError(
      `Flag with id ${flag_id} not found`,
      404,
      "FLAG_NOT_FOUND",
    );
  }

  res.status(200).json({
    success: true,
    data: updatedFlag,
    message: "Flag updated successfully",
  });
};

export const batchUpdateSwitchesController = async (
  req: Request,
  res: Response,
) => {
  const changes: SwitchUpdates = req.body;

  if (!changes || !Array.isArray(changes) || changes.length === 0) {
    throw new AppError(
      "Invalid or empty changes array",
      400,
      "INVALID_CHANGES",
    );
  }

  const results = await batchUpdateSwitches(changes);

  res.status(200).json({
    success: true,
    data: results,
    message: `${results.length} switches updated successfully`,
  });
};

export const deleteFlagController = async (req: Request, res: Response) => {
  const { flagId: flag_id } = req.params;

  if (!flag_id || typeof flag_id !== "string" || flag_id.trim().length === 0) {
    throw new AppError("Falg-ID is required", 400, "MISSING_FLAG_ID");
  }

  const deletedFlag = await deleteFlag(flag_id);

  if (!deletedFlag) {
    throw new AppError(
      `Flag with id ${flag_id} not found`,
      404,
      "FLAG_NOT_FOUND",
    );
  }

  res.status(200).json({
    success: true,
    data: deletedFlag,
    message: "Flag deleted successfully",
  });
};
