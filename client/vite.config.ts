import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://66b5-222-247-17-173.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
