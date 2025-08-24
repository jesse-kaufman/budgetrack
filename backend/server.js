/** @file Main API server. */
import { PORT } from "#config/config.js"
import logger from "#utils/logger.js"
import { logStartup, setupHandlers } from "#utils/serverUtils.js"
import app from "./src/app.js"

setupHandlers()

// Start the server
app.listen(PORT, "0.0.0.0", (e) => {
  // Handle startup errors
  if (e) return logger.error(e, "Error starting server:")
  logStartup({ port: PORT, env: process.env.NODE_ENV })
})
