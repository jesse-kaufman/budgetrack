/** @file Custom logger. */
/* eslint-disable no-magic-numbers */
import chalk from "chalk"
import pino from "pino"
import pretty from "pino-pretty"

const nodeEnv = process.env.NODE_ENV

/**
 * Sets the base logging level for Pino.
 * @returns {number} Base log level.
 */
const baseLevel = () => {
  // Disable logger output in testing
  if (nodeEnv === "test") return Infinity
  // Show DEBUG level for development
  if (!nodeEnv || nodeEnv === "development") return 20
  // Default to INFO
  return 30
}

/** Configuration for pino. */
const pinoConfig = {
  level: baseLevel(),
  redact: {
    paths: [
      "firstName",
      "lastName",
      "ssn",
      "address1",
      "address2",
      "email",
      "phone",
    ],
    censor: "**GDPR COMPLIANT**",
  },
}

/** Configuration for pino-pretty. */
const prettyConfig = {
  /**
   * Format message with icon and color.
   * @param {object} log - Message object.
   * @returns {string} Formatted message.
   */
  messageFormat(log) {
    switch (log.level) {
      case 20: // DEBUG
        return chalk.magenta(`🐞 ${log.msg ?? ""}`)
      case 40: // INFO
        return chalk.yellow(`⚠️ ${log.msg ?? ""}`)
      case 50: // ERROR
        return chalk.red(`🚩 ${log.msg ?? ""}`)
      case 60: // FATAL
        return chalk.red(`💥 ${log.msg ?? ""} -- Exiting`)
      default:
        return log.msg ?? ""
    }
  },
}

/** Instance of pino-pretty or null if in production. */
const pinoPretty = nodeEnv === "production" ? null : pretty(prettyConfig)

/** Instance of pino. */
const logger = pino(pinoConfig, pinoPretty)

/** Internal copy of logger.fatal for use later. */
const _fatal = logger.fatal.bind(logger)

/**
 * Logs success message.
 * @param {string} msg - Message to log.
 * @returns {void}
 */
logger.success = (msg) => logger.info(chalk.green.bold(`🟢 ${msg}`))

/**
 * Logs action message.
 * @param {string} msg - Message to log.
 * @returns {void}
 */
logger.action = (msg) => logger.info(chalk.magentaBright(msg))

/**
 * Logs unhandled exception.
 * @param {object} data - Data from exception.
 * @returns {void}
 */
logger.exception = (data) =>
  logger.error(data, chalk.magenta("Uncaught exception:"))

/**
 * Logs unhandled rejected promise.
 * @param {object} data - Data from promise.
 * @returns {void}
 */
logger.rejection = (data) =>
  logger.error(data, chalk.magenta("Unhandled promise rejection:"))

/**
 * Logs fatal error and exits.
 * @param {object} args - Passed arguments.
 */
logger.fatal = (...args) => {
  _fatal(...args)
  process.exit(1)
}

export default logger
