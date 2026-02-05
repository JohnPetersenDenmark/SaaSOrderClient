import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('VITE CONFIG LOADED')

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true
  }
})
