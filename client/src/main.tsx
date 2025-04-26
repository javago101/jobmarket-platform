// src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App' // ✅ 使用 @ 路径别名
import '@/index.css'     // ✅ 统一样式入口

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
