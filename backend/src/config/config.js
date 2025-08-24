/** @file Configuration options. */
import dotenv from "dotenv"

/** Shorthand for process.env.NODE_ENV. */
export const nodeEnv = process.env.NODE_ENV || "development"

// Get vars from env file based on environment.
// - Production: .env
// - Testing: .env.test
// - Development: .env.development
dotenv.config({
  path: nodeEnv === "production" ? ".env" : `.env.${nodeEnv}`,
  quiet: true,
})

/** API URL prefix. */
export const API_PREFIX = "/api/v1/budgetrack"

/** Default number of documents per page. */
export const DEFAULT_PAGE_SIZE = 10

/** Default port for API. */
export const PORT = process.env.PORT || 3033
