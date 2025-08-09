/** @file CORS middleware. */
import { StatusCodes } from "http-status-codes"
import corsConfig from "#config/cors.js"

/**
 * Applies CORS policies to Express.
 * @returns {void}
 */
const cors = () => (req, res, next) => {
  const { origin } = req.headers

  // Check origin against list of allowed origins
  if (corsConfig.allowedOrigins.includes(origin)) {
    // Allow requests from origin
    res.header("Access-Control-Allow-Origin", origin)
    // Allow cookies/auth headers
    res.header("Access-Control-Allow-Credentials", "true")
  }

  // Tell browsers which headers are accepted (default to headers in request)
  res.header(
    "Access-Control-Allow-Headers",
    req.header("Access-Control-Request-Headers") ||
      "Origin, X-Requested-With, Content-Type, Accept"
  )

  // Tell browsers which methods are accepted (default to methods in request)
  res.header(
    "Access-Control-Allow-Methods",
    req.header("Access-Control-Request-Method") ||
      "GET, POST, PUT, DELETE, PATCH"
  )

  // Set max age for caching
  res.header("Access-Control-Max-Age", "86400") // 24 hours

  // Return OK and end for CORS preflight OPTIONS requests
  if (req.method === "OPTIONS") return res.status(StatusCodes.OK).end()

  // Continue to next middleware
  next()
}

export default cors
