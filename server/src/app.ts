import express, { Request, Response } from "express";
import cors from "cors";
import flagRouter from "./modules/flag/flag.routes";
import authRouter from "./modules/authentication/auth.routes";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";

const FRONTEND_URL = process.env.FRONTEND_URL;
export const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: FRONTEND_URL ? [FRONTEND_URL] : true, // Fallback zu true wenn nicht gesetzt
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", flagRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);
app.get("/", (req: Request, res: Response) => {
  res.send("Backend running");
});
