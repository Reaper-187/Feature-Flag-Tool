import { Request, Response } from "express";

export const createFlag = async (req: Request, res: Response) => {
  try {
    const flagPost = req.body;
    console.log("flagPost", flagPost);

    res.status(201).json({
      success: true,
      data: flagPost,
      message: "Flag created successfully",
    });
  } catch (err) {
    console.log("FEHLER BEIM POST", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
