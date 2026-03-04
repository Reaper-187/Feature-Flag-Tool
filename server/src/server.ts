import prisma from "./lib/prisma";
import "dotenv/config";
import { app } from "./app";

if (process.env.NODE_ENV !== "production") {
  await import("dotenv/config");
}

const PORT: number = parseInt(process.env.PORT || "5000", 10); // Port wird als number conv

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
