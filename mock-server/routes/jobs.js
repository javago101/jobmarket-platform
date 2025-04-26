// mock-server/routes/jobs.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// 读取模拟数据
const jobs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/jobs.json"), "utf-8")
);

router.get("/", (req, res) => {
  const { page = 1, limit = 10, keyword = "", workMode = "all" } = req.query;
  const start = (page - 1) * limit;
  const end = start + Number(limit);

  const filtered = jobs.filter((job) => {
    const matchesKeyword = job.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesWorkMode = workMode === "all" || job.workMode === workMode;
    return matchesKeyword && matchesWorkMode;
  });

  res.json({
    jobs: filtered.slice(start, end),
    total: filtered.length,
  });
});

router.get("/stats", (req, res) => {
  const typeStats = {};
  const locationStats = {};
  jobs.forEach((j) => {
    typeStats[j.type] = (typeStats[j.type] || 0) + 1;
    locationStats[j.location] = (locationStats[j.location] || 0) + 1;
  });
  res.json({ typeStats, locationStats });
});

router.get("/:id", (req, res) => {
  const job = jobs.find((j) => j.id === req.params.id);
  job ? res.json(job) : res.status(404).json({ error: "Not Found" });
});

router.get("/suggest", (req, res) => {
  const { q = "" } = req.query;
  if (!q.trim()) {
    return res.json({ jobs: [], companies: [], locations: [] });
  }

  const keyword = q.toLowerCase();
  const suggestions = {
    jobs: [
      ...new Set(
        jobs
          .filter((job) => job.title.toLowerCase().includes(keyword))
          .map((job) => job.title)
          .slice(0, 5)
      ),
    ],
    companies: [
      ...new Set(
        jobs
          .filter((job) => job.company.toLowerCase().includes(keyword))
          .map((job) => job.company)
          .slice(0, 5)
      ),
    ],
    locations: [
      ...new Set(
        jobs
          .filter((job) => job.location.toLowerCase().includes(keyword))
          .map((job) => job.location)
          .slice(0, 5)
      ),
    ],
  };

  res.json(suggestions);
});

export default router;
