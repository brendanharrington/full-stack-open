import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        // Allow overriding the backend target via BACKEND_URL environment
        // When running locally: BACKEND_URL defaults to http://localhost:3000
        // When running inside Docker compose, you can set BACKEND_URL=http://backend:3000
        target: process.env.BACKEND_URL || 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
