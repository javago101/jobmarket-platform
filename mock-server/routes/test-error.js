// mock-server/routes/test-error.js
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  const type = req.query.type

  if (type === '401') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (type === '500') {
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  if (type === 'timeout') {
    return new Promise(() => {}) // 永不返回，模拟前端超时
  }

  res.json({ message: '✅ No error. Everything is fine.' })
})

export default router
