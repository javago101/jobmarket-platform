// mock-server/routes/match.js
import express from 'express'
import { faker } from '@faker-js/faker'

const router = express.Router()

router.post('/', (req, res) => {
  const resume = req.body.resume || ''

  // 根据简历文本模拟生成 3 个匹配结果
  const matches = Array.from({ length: 3 }).map(() => ({
    jobId: faker.string.uuid(),
    title: faker.person.jobTitle(),
    score: parseFloat(faker.number.float({ min: 0.7, max: 0.99, precision: 0.01 }).toFixed(2))
  }))

  res.json({ matches })
})

export default router
