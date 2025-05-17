import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'generate-redirects',
      closeBundle() {
        // Create a _redirects file in the dist directory
        writeFileSync('dist/_redirects', '/* /index.html 200');
      }
    }
  ],
})
