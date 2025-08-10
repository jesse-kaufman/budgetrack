/** @file Server utility functions. */
import chalk from "chalk"
import { toUpperFirst } from "shared/text"
import logger from "#utils/logger.js"

/** Width for dividers in logging output. */
const charWidth = 60

/**
 * Logs server startup message to console.
 * @param {object} args - Arguments sent to function.
 * @param {number} args.port - Port server is running on.
 * @param {string} args.env - Node environment.
 */
export const logStartup = (args) => {
  /** Color for printing environment. */
  const envColor = args.env === "production" ? chalk.green.bold : chalk.yellow
  /** Colorized output of environment. */
  const env = envColor(toUpperFirst(args.env))

  // Print out some useful information when starting server
  logger.info("-".repeat(charWidth))
  logger.info(`Server started: ${new Date().toLocaleString("en-US")}`)
  logger.info("-".repeat(charWidth))
  logger.success(chalk.green(`${env} server listening on port ${args.port}.`))
}
