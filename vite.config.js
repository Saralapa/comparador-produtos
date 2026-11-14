import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // configuracao dos testes (vitest)
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
