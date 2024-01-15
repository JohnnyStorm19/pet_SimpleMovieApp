import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://pet-simple-movie-app.vercel.app/'
})

console.log(process.env.VITE_BASE_PATH);
