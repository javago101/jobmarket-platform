// src/types/job.ts
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  [key: string]: any; // 允许扩展字段
}

export interface JobListResponse {
  jobs: Job[];
  total: number;
}
