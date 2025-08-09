/** @file NotFoundError class. */
import { StatusCodes } from "http-status-codes"

/**
 * NotFoundError class representing a 404 Not Found error.
 * @augments Error
 * @param {string} message - Error message to throw.
 */
export default class NotFoundError extends Error {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} message - Error message to throw.
   */
  constructor(message = "Not Found") {
    super(message)
    this.name = "NotFoundError"
    this.statusCode = StatusCodes.NOT_FOUND
  }
}
