/** @file NotFoundError class. */
import { StatusCodes } from "http-status-codes"

/**
 * NotFoundError class representing a 404 Not Found error.
 * @augments Error
 * @param {string} message - Error message to throw.
 */
export class NotFoundError extends Error {
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

/**
 * BadRequestError class representing a 400 Bad Request error.
 * @augments Error
 * @param {string} message - Error message to throw.
 */
export class BadRequestError extends Error {
  /**
   * Creates an instance of BadRequestError.
   * @param {string} message - Error message to throw.
   */
  constructor(message = "Bad Request") {
    super(message)
    this.name = "BadRequestError"
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
