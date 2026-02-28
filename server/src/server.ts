import { Request, Response } from "express";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
// const cors = require("cors");
const app = express();

app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// app.use(
//   cors({
//     origin: [FRONTEND_URL],
//     credentials: true,
//   }),
// );

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Backend running");
});

async function startServer() {
  try {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
}

startServer();
