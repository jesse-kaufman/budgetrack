/** @file JSON Parser middleware. */
import express from "express"
import { StatusCodes } from "http-status-codes"

/**
 * Parses JSON body for only POST, PUT, and PATCH requests.
 * @returns {Function} - Middleware function.
 */
const parseJson = () => (req, res, next) => {
  // If request is not POST, PUT, or PATCH, skip parsing and continue to next middleware
  if (!["POST", "PUT", "PATCH"].includes(req.method)) return next()

  // Setup parser from Express with strict parsing enabled.
  const parser = express.json({ strict: true })

  // Attempt to parse body as JSON and handle errors with callback
  parser(req, res, (err) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Invalid JSON",
        message: err.message,
      })
    }
    next()
  })
}

export default parseJson
