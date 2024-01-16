import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Use polling mode to watch for file changes
      // Only necessary if your file system doesn't support file events
      usePolling: true,
    },
  },
})
