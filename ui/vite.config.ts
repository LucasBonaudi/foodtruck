import { defineConfig } from "vitest/config"
import { loadEnv } from 'vite'
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_API_BASE_URL ?? 'http://localhost:8000'}`;

  return {
    plugins: [react()],
    server: {
      
      host: true,
      port: 5173,

      open: false,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
  }
})
