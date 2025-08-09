/** @file Main API server. */
import chalk from "chalk"
import "dotenv/config"
import app from "./src/app.js"
import { PORT } from "#config/config.js"
import logger from "#utils/logger.js"
import { logStartup } from "#utils/serverUtils.js"

// Graceful shutdown
process.on("uncaughtException", (err) => {
  logger.error(err, "Uncaught Exception:")
  process.exit(1)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled Promise Rejection")
  process.exit(1)
})

// Handle shutdown signals
process.on("SIGINT", () => {
  logger.info(chalk.magenta("Received SIGINT, shutting down..."))
  process.exit(0)
})

// Handle SIGTERM (e.g., from Docker or Kubernetes)
process.on("SIGTERM", () => {
  logger.info(chalk.magenta("Received SIGTERM, shutting down..."))
  process.exit(0)
})

// Start the server
app.listen(PORT, "0.0.0.0", (err) => {
  // Handle startup errors
  if (err) return logger.error("Error starting server:", err.message)
  logStartup({ port: PORT, env: process.env.NODE_ENV })
})
