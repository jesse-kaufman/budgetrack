/** @file Repository registry. */
import schemas from "./schema.js"
import models from "./model.js"
import BaseRepository from "#repositories/BaseRepository.js"
import db from "#src/db.js"

/**
 * Registry that maps schema names to BaseRepository instances.
 *  @type {Record<string, BaseRepository>}
 */
const repositories = {}

/**
 * Creates repository instance.
 * @param {object} schema - Schema config.
 * @returns {BaseRepository} Instance of BaseRepository or a subclass.
 */
const createRepo = (schema) => {
  // Get model from model registry
  const model = models[schema.name]
  // Get TypeORM repository
  const typeOrmRepo = db.getRepository(model)
  // Get custom repository class
  const CustomRepository = schema.customRepository

  // If custom repository is set, create an instance of that class
  if (CustomRepository) return new CustomRepository(typeOrmRepo, schema)

  // Otherwise, create instance of BaseRepository
  return new BaseRepository(typeOrmRepo, schema)
}

// Walk through schemas, creating a repository for each
for (const schema of Object.values(schemas)) {
  // Do not register repository if registerRepository is explicitly false
  if (schema.registerRepository !== false) {
    // Create the repository and add to the registry
    repositories[schema.name] = createRepo(schema)
  }
}

export default repositories
