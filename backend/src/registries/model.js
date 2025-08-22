/** @file Model registry. */
import { EntitySchema } from "typeorm"
import schemas from "./schema.js"

/**
 * Registry that maps schema names to TypeORM EntitySchema instances.
 * @type {Record<string, import("typeorm").EntitySchema>}
 */
const models = {}

// Walk through each schema, create an EntitySchema instance, and add to registry
for (const schema of Object.values(schemas)) {
  models[schema.name] = new EntitySchema({
    name: schema.name,
    tableName: schema.tableName,
    columns: schema.columns,
    relations: schema.relations,
  })
}

export default models
