// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // শুধু react() দরকার

  server: {
    proxy: {
      "/api": {
        target: "https://social-development-events-platform-brown.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
