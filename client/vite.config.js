// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // ✅ 设置 @ 指向 src/
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 1119,
      proxy: {
        "/api": {
          target: "http://localhost:1099",
          changeOrigin: true,
        },
        "/ai": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
        "/realapi": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
  };
});
