/** @file Controller registry. */
import BaseController from "#controllers/BaseController.js"
import logger from "#utils/logger.js"
import schemas from "./schema.js"
import services from "./service.js"

logger.debug("Initializing controller registry...")

/**
 * Registry that maps schema names to TypeORM EntitySchema instances.
 * @type {Record<string, BaseController>}
 */
const controllers = {}

// Walk through each schema, create a BaseService instance, and add to registry
for (const schema of Object.values(schemas)) {
  controllers[schema.name] = new BaseController(services[schema.name])
  logger.debug(`- registered ${schema.name} controller`)
}

export default controllers
