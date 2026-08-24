import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// В dev-режиме Vite проксирует /api/* → https://mapi.fitnesshouse.ru/api/*
// В продакшене выставь VITE_API_BASE=https://mapi.fitnesshouse.ru (или настрой CORS на сервере)
/*
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://mapi.fitnesshouse.ru",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
*/
export default defineConfig({
  plugins: [react()],
  base: "/prototype/",
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://mapi.fitnesshouse.ru",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});