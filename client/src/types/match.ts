// src/types/match.ts

import type { Job } from "./job.ts";

export interface MatchRequest {
  resume: string; // 简历文本
}

export interface MatchResponse {
  matches: Job[]; // 推荐的职位列表
}
