// mock-server/routes/suggest.js
// routes/suggest.js
import { faker } from "@faker-js/faker";
import express from "express";

const router = express.Router();

// ✅ 一次性生成假数据池（缓存）
const SUGGESTION_POOL = {
  jobs: Array.from({ length: 40 }, () => faker.person.jobTitle()),
  companies: Array.from({ length: 40 }, () => faker.company.name()),
  locations: Array.from({ length: 40 }, () => faker.location.city()),
};

console.log("📦 Suggestion pool generated:", SUGGESTION_POOL);

// ✅ 处理搜索请求
router.get("/", (req, res) => {
  const keyword = (req.query.keyword || "").toLowerCase();

  // 工具函数：过滤包含 keyword 的项，最多返回 5 个
  const filterByKeyword = (list) =>
    list.filter((item) => item.toLowerCase().includes(keyword)).slice(0, 5);

  const suggestions = {
    jobs: filterByKeyword(SUGGESTION_POOL.jobs),
    companies: filterByKeyword(SUGGESTION_POOL.companies),
    locations: filterByKeyword(SUGGESTION_POOL.locations),
  };

  res.json(suggestions);
});

export default router;
