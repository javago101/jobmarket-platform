// src/api/matchApi.ts

import type { MatchResponse } from "@/types/match.ts";
import axios from "../api/axiosInstance.ts";

// 提交简历文本进行智能匹配
export const postMatch = (resumeText: string): Promise<MatchResponse> => {
  return axios.post("/api/match", { resume: resumeText });
};
