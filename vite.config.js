import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // NEW IMPORT

// https://vite.dev/config/
export default defineConfig({
  // ⚡ The new plugin handles everything automatically
  plugins: [react(), tailwindcss()],
})