import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        compact: true
      }
    }
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
}) 