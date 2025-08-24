/** @file Service registry. */
import BaseService from "#services/BaseService.js"
import logger from "#utils/logger.js"
import repositories from "./repository.js"
import schemas from "./schema.js"

logger.debug("Initializing service registry...")

/**
 * Registry that maps schema names to TypeORM EntitySchema instances.
 * @type {Record<string, BaseService>}
 */
const services = {}

// Walk through each schema, create an EntitySchema instance, and add to registry
for (const schema of Object.values(schemas)) {
  // Do not register repository if registerRepository or registerService is explicitly false
  if (schema.registerRepository === false || schema.registerService === false) {
    continue
  }

  const CustomService = schema.customService

  // If custom repository is set, create an instance of that class
  if (CustomService) {
    services[schema.name] = new CustomService(repositories[schema.name], schema)
    continue
  }

  // Add service to registry
  services[schema.name] = new BaseService(repositories[schema.name], schema)
  logger.debug(`- registered ${schema.name} service`)
}

export default services
