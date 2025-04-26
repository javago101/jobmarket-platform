// mock-server/app.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jobsRouter from "./routes/jobs.js";
import matchRouter from "./routes/match.js";
import suggestRouter from "./routes/suggest.js";
import testErrorRouter from "./routes/test-error.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRouter);
app.use("/api/match", matchRouter);
app.use("/api/test-error", testErrorRouter);
app.use("/api/suggest", suggestRouter);

app.listen(PORT, () => {
  console.log(`✅ Mock Server running at http://localhost:${PORT}`);
  console.log("👉 PORT from .env:", PORT);
});

app.get("/", (req, res) => {
  res.json({
    message: "🧪 Mock Server is running",
    port: PORT,
  });
});
