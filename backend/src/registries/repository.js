/** @file Repository registry. */
import BaseRepository from "#repositories/BaseRepository.js"
import db from "#src/db.js"
import logger from "#utils/logger.js"
import models from "./model.js"
import schemas from "./schema.js"

logger.debug("Initializing repository registry...")

/**
 * Registry that maps schema names to BaseRepository instances.
 * @type {Record<string, BaseRepository>}
 */
const repositories = {}

// Walk through schemas, creating a repository for each
for (const schema of Object.values(schemas)) {
  // Do not register repository if registerRepository is explicitly false
  if (schema.registerRepository === false) continue

  // Get model from model registry
  const model = models[schema.name]
  // Get TypeORM repository
  const typeOrmRepo = db.getRepository(model)
  // Get custom repository class
  const CustomRepository = schema.customRepository

  // If custom repository is set, create an instance of that class
  if (CustomRepository) {
    repositories[schema.name] = new CustomRepository(typeOrmRepo, schema)
    continue
  }

  // Create the repository and add to the registry
  repositories[schema.name] = new BaseRepository(typeOrmRepo, schema)
  logger.debug(`- registered ${schema.name} repository`)
}

export default repositories
