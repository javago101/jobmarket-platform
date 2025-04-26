// ✅ src/components/JobCard.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

type Job = {
  id: string
  title: string
  company: string
  location: string
  workMode: string
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-md transition cursor-pointer">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{job.company}</p>
        <p className="text-xs mt-1">
          {job.location} · {job.workMode}
        </p>
      </CardContent>
    </Card>
  )
}