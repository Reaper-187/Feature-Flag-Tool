import { Request, Response } from "express";
import prisma from "./lib/prisma";
import "dotenv/config";
import express from "express";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  await import("dotenv/config");
}

const app = express();

app.set("trust proxy", 1);

const PORT: number = parseInt(process.env.PORT || "5000", 10); // Port wird als number conv
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL ? [FRONTEND_URL] : true, // Fallback zu true wenn nicht gesetzt
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend running");
});

async function startServer() {
  try {
    await prisma.$connect();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`DB is connected ----- Server running at: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
}

startServer();
