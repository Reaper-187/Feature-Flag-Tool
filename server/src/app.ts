import express, { Request, Response } from "express";
import cors from "cors";
import createFlag from "./modules/flag/flag.routes";
import getFlags from "./modules/flag/flag.routes";
import updateFlag from "./modules/flag/flag.routes";

export const app = express();
// import { sessionSetup } from "./config/session";

const FRONTEND_URL = process.env.FRONTEND_URL;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: FRONTEND_URL ? [FRONTEND_URL] : true, // Fallback zu true wenn nicht gesetzt
    credentials: true,
  }),
);

// app.use(sessionSetup);

app.use(express.json());

app.use("/api", createFlag);
app.use("/api", getFlags);
app.use("/api", updateFlag);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend running");
});
