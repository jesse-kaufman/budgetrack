/** @file Vitest config. */
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
