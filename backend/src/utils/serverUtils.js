/** @file Server utility functions. */
import chalk from "chalk"
import { toUpperFirst } from "shared/text"
import { nodeEnv } from "#config/config.js"
import logger from "#utils/logger.js"

/** Width for dividers in logging output. */
const charWidth = 50
/** Backend version from package.json. */
const version = process.env.npm_package_version
/** Color for printing environment. */
const envColor = nodeEnv === "production" ? chalk.green.bold : chalk.yellow
/** Colorized output of environment. */
const env = envColor(toUpperFirst(nodeEnv))

/**
 * Logs server startup message to console.
 * @param {object} args - Arguments sent to function.
 * @param {number} args.port - Port server is running on.
 * @param {string} args.env - Node environment.
 */
export const logStartup = (args) => {
  const date = new Date().toLocaleString("en-US")

  logger.info("-".repeat(charWidth))
  logger.info(`Server v${version} started: ${date}`)
  logger.info("-".repeat(charWidth))
  logger.success(chalk.green(`${env} server listening on port ${args.port}.`))
}

/**
 * Sets up server handlers for uncaught exceptions, unhandled rejections,
 * SIGINT, and SIGTERM.
 */
export const setupHandlers = () => {
  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    logger.exception(err)
    process.exit(1)
  })

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    logger.rejection(err)
    process.exit(1)
  })

  // Handle shutdown signals
  process.on("SIGINT", () => {
    logger.action("Received SIGINT, shutting down...")
    process.exit(0)
  })

  // Handle SIGTERM (e.g., from Docker or Kubernetes)
  process.on("SIGTERM", () => {
    logger.action("Received SIGTERM, shutting down...")
    process.exit(0)
  })
}
