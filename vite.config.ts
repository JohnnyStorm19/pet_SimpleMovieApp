import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  base: "https://pet-simple-movie-app.vercel.app/",
  // base: process.env.BASE_URL || "/",
  define: {
    "process.env": {
      BASE_URL: JSON.stringify(process.env.BASE_URL || "/"),
    },
  },
});

console.log(process.env.VITE_BASE_PATH);
