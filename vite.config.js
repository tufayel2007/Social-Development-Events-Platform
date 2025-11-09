// vite.config.js (একদম ফাইনাল ভার্সন)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // এই অংশটা যোগ করো (সবচেয়ে গুরুত্বপূর্ণ!)
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
