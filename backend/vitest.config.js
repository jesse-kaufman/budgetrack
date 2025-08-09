/** @file Vitest config. */
import path from "node:path"
import { defineConfig } from "vitest/config"

const exclude = [
  "**/node_modules/**",
  "src/config",
  "*.config.js",
  "src/routes/*",
  "src/app.js",
  "server.js",
  "src/utils/logger.js",
]

export default defineConfig({
  resolve: {
    alias: {
      "#config": path.resolve(__dirname, "./src/config"),
      "#controllers": path.resolve(__dirname, "./src/controllers"),
      "#errors": path.resolve(__dirname, "./src/errors"),
      "#middlewares": path.resolve(__dirname, "./src/middlewares"),
      "#models": path.resolve(__dirname, "./src/models"),
      "#repositories": path.resolve(__dirname, "./src/repositories"),
      "#routes": path.resolve(__dirname, "./src/routes"),
      "#services": path.resolve(__dirname, "./src/services"),
      "#utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    environment: "node",
    globals: true,
    exclude,
    coverage: {
      exclude,
    },
    setupFiles: ["./vitest.setup.js"],
  },
})
