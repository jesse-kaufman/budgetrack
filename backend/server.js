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
process.on("unhandledRejection", (reason) => {
  logger.error(reason, chalk.magenta("Unhandled Promise Rejection"))
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
app.listen(PORT, "0.0.0.0", (e) => {
  // Handle startup errors
  if (e) return logger.error(e, "Error starting server:")
  logStartup({ port: PORT, env: process.env.NODE_ENV })
})
