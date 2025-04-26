// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    // Add authorization header if token exists
    ...(import.meta.env.VITE_API_TOKEN && {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    }),
  },
});

export default axiosInstance;
