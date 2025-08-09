/** @file Custom logger. */
/* eslint-disable no-magic-numbers */
import pino from "pino"
import pretty from "pino-pretty"
import chalk from "chalk"

/** Holds pino-pretty configuration. */
const stream = pretty({
  // This function builds the complete log line
  messageFormat(log) {
    let colorizeMsg = null
    switch (log.level) {
      case 40: // 'warn'
        colorizeMsg = chalk.yellow(`⚠️ ${log.msg}`)
        break
      case 50: // 'error'
        colorizeMsg = chalk.red(`‼️ ${log.msg}`)
        break
      default:
        colorizeMsg = log.msg
    }

    return `${colorizeMsg}`
  },
})

/** Holds logger instance. */
const logger = pino(stream)

/**
 * Logs success message.
 * @param {string} msg - Message to log.
 * @returns {void}
 */
logger.success = (msg) => logger.info(chalk.green.bold(`🟢${msg}`))

/**
 * Logs action message.
 * @param {string} msg - Message to log.
 * @returns {void}
 */
logger.action = (msg) => logger.info(chalk.magenta(msg))

export default logger
