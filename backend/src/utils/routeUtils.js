/** @file Route utility functions. */
import { Router } from "express"
import { API_PREFIX } from "#config/config.js"
import logger from "#utils/logger.js"

/**
 * Writes message to debug log stating that route has been registered.
 * @param {string} endpoint - Root API schema endpoint.
 * @param {string} route - Topmost API route.
 */
const logRegistration = (endpoint, route) => {
  // Get full API path without trailing slash
  const apiPath = `${API_PREFIX}/${endpoint}${route.path.replace(/\/$/, "")}`
  // Get method in all caps
  const method = route.method.toUpperCase()
  // Get middleware name wrapped in {} or empty string if none set
  const middleware = route.middleware ? `{${route.middleware?.name}}` : ""
  // Log registration
  logger.debug(`- registered [${method}]: ${apiPath} ${middleware}`)
}

/**
 * Initialize routes for a given schema.
 * @param {object} schema - Schema to initialize routes for.
 * @param {object} controller - Controller for schema.
 * @returns {Router} Routes to be registered for schema.
 */
const initRoutes = (schema, controller) => {
  logger.debug("Registering routes ...")

  // Get routes from schema
  const { routes, endpoint } = schema
  // Create new router
  const router = new Router()

  // Add POST for / endpoint
  for (const route of routes) {
    const { method, path, middleware, handler } = route
    // If middleware is set, register route with middleware
    if (middleware) {
      router[method](path, middleware, controller[handler])
      logRegistration(endpoint, route)
      continue
    }

    console.log(method, path)
    console.log(controller[handler])
    // Otherwise, register route without middleware
    router[method](path, controller[handler])
    logRegistration(endpoint, route)
  }

  return router
}

/**
 * Registers routes for all schemas.
 * @param {object} app - Express app.
 * @param {Array[object]} schemas - Schemas to register routes for.
 * @param {Array[object]} controllers - Controllers for routes.
 */
const registerSchemaRoutes = (app, schemas, controllers) => {
  for (const schema of Object.values(schemas)) {
    // Do not register routes if registerRoutes is explicitly false
    if (schema.registerRoutes === false) continue
    // Initialize routes
    const routes = initRoutes(schema, controllers[schema.name])
    // Register routes with Express
    app.use(`${API_PREFIX}/${schema.endpoint}`, routes)
  }
}

export default registerSchemaRoutes
