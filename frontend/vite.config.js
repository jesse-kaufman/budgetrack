/** @file Vite configuration. */
import path from "node:path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      "#base": path.resolve(__dirname, "./src/components/base"),
      "#budget": path.resolve(__dirname, "./src/components/budget"),
      "#config": path.resolve(__dirname, "./src/config"),
      "#layouts": path.resolve(__dirname, "./src/layouts"),
      "#services": path.resolve(__dirname, "./src/services"),
      "#shared": path.resolve(__dirname, "../shared/src"),
      "#stores": path.resolve(__dirname, "./src/stores"),
      "#ui": path.resolve(__dirname, "./src/components/ui"),
      "#utils": path.resolve(__dirname, "./src/utils"),
      "#views": path.resolve(__dirname, "./src/views"),
    },
  },
  server: {
    watch: {
      ignored: ["*.config.js", "node_modules", ".git", "**/db.json"],
    },
    proxy: {
      "/api/v1": {
        target: "http://localhost:3033",
        changeOrigin: true,
      },
    },
  },
})
