import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // any Vue requests with /api in the path will be sent to Express server (localhost:3000)
      '/api': 'http://localhost:3000/'
    }
  }
})
