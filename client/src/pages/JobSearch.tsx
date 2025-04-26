// src/pages/JobSearch.tsx
import { fetchJobs } from "@/api/jobApi.ts";
import JobList from "@/components/JobList.tsx";
import JobSearchForm from "@/components/JobSearchForm.tsx";
import useJobSearchStore from "@/store/useJobSearchStore.ts";
import type { Job, JobListResponse } from "@/types/job.ts";
import { useEffect, useState } from "react";

export default function JobSearch() {
  const { query, workMode, page, limit } = useJobSearchStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchJobs({ page, limit, keyword: query, workMode })
      .then((res: JobListResponse) => {
        setJobs(res.jobs);
        setTotal(res.total);
      })
      .catch((err: unknown) => {
        console.error("❌ Failed to fetch jobs:", err);
      });
  }, [page, query, workMode]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">📋 Job Search</h1>
      <JobSearchForm />
      <JobList jobs={jobs} />
    </div>
  );
}
