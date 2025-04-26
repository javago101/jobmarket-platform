// mock-server/generate.js
import fs from 'fs'
import { faker } from '@faker-js/faker'

const jobTypes = ['Engineering', 'Marketing', 'Design']
const workModes = ['Remote', 'Onsite', 'Hybrid']
const locations = ['San Francisco', 'New York', 'Remote', 'Seattle', 'Boston']

const generateJobs = (count = 50) => {
  const jobs = []

  for (let i = 0; i < count; i++) {
    jobs.push({
      id: faker.string.uuid(),
      title: faker.person.jobTitle(),
      company: faker.company.name(),
      location: faker.helpers.arrayElement(locations),
      type: faker.helpers.arrayElement(jobTypes),
      salary: `${faker.number.int({ min: 50000, max: 200000 })} USD`,
      workMode: faker.helpers.arrayElement(workModes),
      postedAt: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
      description: faker.lorem.paragraph()
    })
  }

  return jobs
}

const jobs = generateJobs(50)
fs.writeFileSync('./data/jobs.json', JSON.stringify(jobs, null, 2))
console.log('✅ jobs.json 已生成，共 50 条职位数据')
