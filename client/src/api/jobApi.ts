// src/api/jobApi.ts
import type { Job } from "@/types/job.js";
import axiosInstance from "./axiosInstance.ts";

import type { JobListResponse } from "@/types/job.js";
import axios from "./axiosInstance.js";

export const fetchJobs = (params = {}): Promise<JobListResponse> => {
  return axios.get("/api/jobs", { params });
};

export interface JobQueryParams {
  page?: number;
  limit?: number;
  keyword?: string;
  workMode?: "Remote" | "Onsite" | "Hybrid" | "all";
}

export interface JobResponse {
  jobs: Job[];
  total: number;
}

export const fetchJobById = (id: string): Promise<Job> => {
  return axiosInstance.get(`/api/jobs/${id}`);
};

export const postMatch = (resumeText: string): Promise<{ matches: Job[] }> => {
  return axiosInstance.post("/api/match", { resume: resumeText });
};

export const triggerError = (type: "401" | "500" | "timeout"): Promise<any> => {
  return axiosInstance.get(`/api/test-error?type=${type}`);
};
