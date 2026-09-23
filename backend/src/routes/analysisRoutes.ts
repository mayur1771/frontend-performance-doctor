import { Router } from "express";
import crypto from "node:crypto";
import Analysis from "../models/Analysis.js";
import { buildDemoAnalysis } from "../services/analysisEngine.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body as { url?: string };

    if (!url || typeof url !== "string") {
      return res.status(400).json({ message: "A valid URL is required." });
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return res.status(400).json({ message: "Please enter a valid URL, e.g. https://example.com" });
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return res.status(400).json({ message: "Only HTTP and HTTPS URLs are supported." });
    }

    const result = buildDemoAnalysis(parsed.toString());

    if (process.env.MONGODB_URI) {
      const saved = await Analysis.create(result);
      return res.status(201).json({
        ...saved.toObject(),
        id: String(saved._id),
        createdAt: saved.createdAt.toISOString()
      });
    }

    return res.status(201).json({
      ...result,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to generate analysis." });
  }
});

router.get("/", async (_req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.json([]);
    }

    const analyses = await Analysis.find().sort({ createdAt: -1 }).limit(50).lean();

    return res.json(
      analyses.map((item) => ({
        ...item,
        id: String(item._id),
        createdAt: item.createdAt.toISOString()
      }))
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch analyses." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.status(404).json({ message: "Persistent database mode is not enabled." });
    }

    const item = await Analysis.findById(req.params.id).lean();

    if (!item) {
      return res.status(404).json({ message: "Analysis not found." });
    }

    return res.json({
      ...item,
      id: String(item._id),
      createdAt: item.createdAt.toISOString()
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch analysis." });
  }
});

export default router;