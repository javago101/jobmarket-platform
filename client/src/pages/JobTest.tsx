// src/pages/JobTest.tsx

import { useEffect, useState } from "react"
import { fetchJobs, triggerError } from "@/api/jobApi"

export default function JobTest() {
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    fetchJobs({ page: 1, limit: 5 })
      .then((res) => {
        console.log("📋 职位数据:", res)
        setJobs(res.jobs || [])
      })
      .catch((err) => console.log("❌ 获取失败:", err.message))

    triggerError("timeout")
      .catch((err) => console.warn("⚠️ 模拟错误:", err.message))
  }, [])

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">🧪 Job API Test</h2>
      {jobs.map((job) => (
        <div key={job.id} className="mb-4">
          <strong>{job.title}</strong> at {job.company} - {job.location}
        </div>
      ))}
    </div>
  )
}
