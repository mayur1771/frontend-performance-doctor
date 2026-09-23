import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import analysisRoutes from "./routes/analysisRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL?.split(",") || true
}));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "Frontend Performance Doctor API",
    status: "running",
    mode: process.env.MONGODB_URI ? "mongodb" : "memory-demo"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "demo-memory-mode"
  });
});

app.use("/api/analyses", analysisRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error." });
});

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } else {
      console.log("MONGODB_URI not set. Running in demo memory mode.");
    }

    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
}

start();