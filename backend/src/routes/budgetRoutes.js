/** @file Submission routes. */
import { Router } from "express"
import { API_PREFIX } from "#config/config.js"
import controllers from "#registries/controller.js"
import schemas from "#registries/schema.js"
import logger from "#utils/logger.js"

logger.debug("Registering Submission routes ...")

/**
 * Routers for Budget schema.
 * @type {Router}
 */
const budgetRoutes = new Router()

// Get routes from schema
const { routes, endpoint } = schemas.Budget
// Get controller from registry
const controller = controllers.Budget

/**
 * Writes message to debug log stating that route has been registered.
 * @param {string} route - Topmost API route.
 */
const logRegistration = (route) => {
  // Get full API path without trailing slash
  const apiPath = `${API_PREFIX}/${endpoint}${route.path.replace(/\/$/, "")}`
  // Get method in all caps
  const method = route.method.toUpperCase()
  // Get middleware name wrapped in {} or empty string if none set
  const middleware = route.middleware ? `{${route.middleware?.name}}` : ""
  // Log registration
  logger.debug(`- registered [${method}]: ${apiPath} ${middleware}`)
}

// Add POST for / endpoint
for (const route of routes) {
  const { method, path, middleware, handler } = route

  // If middleware is set, register route with middleware
  if (middleware) {
    budgetRoutes[method](path, middleware, controller[handler])
    logRegistration(route)
    continue
  }

  // Otherwise, register route without middleware
  budgetRoutes[method](path, controller[handler])
  logRegistration(route)
}

export default budgetRoutes
