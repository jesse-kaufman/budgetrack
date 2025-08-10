/** @file Vitest config. */
import path from "node:path"
import { defineConfig } from "vitest/config"

const exclude = ["**/node_modules/**", "*.config.js"]

export default defineConfig({
  resolve: {
    alias: {
      "#text": path.resolve(__dirname, "./src/text"),
      "#shared": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    globals: true,
    exclude,
    coverage: {
      exclude,
    },
  },
})
