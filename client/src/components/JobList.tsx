// ✅ src/components/JobList.tsx
import JobCard from "./JobCard"

type Job = {
  id: string
  title: string
  company: string
  location: string
  workMode: string
}

export default function JobList({ jobs }: { jobs: Job[] }) {
  if (!jobs.length)
    return <p className="text-sm text-muted-foreground">No jobs found.</p>

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}