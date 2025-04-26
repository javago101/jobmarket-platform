// src/api/axiosInstance.ts
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "", // 使用 Vite proxy 自动转发 /api → localhost:1099
  timeout: 3000,
});

axiosInstance.interceptors.request.use((config) => {
  console.log("🚀 Request:", {
    method: config.method,
    url: config.url,
    params: config.params,
    data: config.data,
  });
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    console.log("✅ Response:", {
      status: res.status,
      data: res.data,
    });
    return res.data;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.warn("⏱ 请求超时");
    } else if (error.response) {
      console.error("❌ 接口错误:", error.response.status, error.response.data);
    } else {
      console.error("🔌 网络异常:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
