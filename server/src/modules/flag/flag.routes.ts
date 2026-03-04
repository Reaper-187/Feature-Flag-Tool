import { Router } from "express";
import { createFlag } from "./flag.controller";

const router = Router();

router.post("/createFlag", createFlag);

export default router;
