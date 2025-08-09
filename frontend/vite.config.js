/** @file Vite configuration. */
import path from "node:path"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "#base": path.resolve(__dirname, "./src/components/base"),
      "#budget": path.resolve(__dirname, "./src/components/budget"),
      "#config": path.resolve(__dirname, "./src/config"),
      "#services": path.resolve(__dirname, "./src/services"),
      "#stores": path.resolve(__dirname, "./src/stores"),
      "#layouts": path.resolve(__dirname, "./src/layouts"),
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
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
})
