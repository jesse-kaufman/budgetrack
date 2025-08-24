/** @file Schema registry. */
import fs from "node:fs"
import path from "node:path"
import { getAbsolutePath } from "#utils/fsUtils.js"
import logger from "#utils/logger.js"
import { initSchema } from "#utils/schemaUtils.js"

logger.debug("Initializing schema registry...")

/**
 * Registry that maps schema names to schema configuration objects.
 * @type {Record<string, object>}
 */
const schemas = {}

/** @type {string} Absolute path to schemas directory. */
const schemasDir = getAbsolutePath(import.meta.url, "../schemas")

// Walk through *Schema.js files and import each
const imports = await Promise.all(
  fs
    .readdirSync(schemasDir)
    .filter((f) => f.endsWith("Schema.js"))
    .map((f) => import(path.join(schemasDir, f)))
)

// Walk through imported modules, adding each to registry
for (const _import of imports) {
  // Extract schema name from import
  const { name } = _import.default
  // Try to initialize schema object from definition and add to registry
  try {
    schemas[name] = initSchema(_import.default)
    logger.debug(` - registered ${name} schema`)
  } catch (e) {
    logger.fatal(`Failed to initialize ${name} schema - ${e.message}`)
  }
}

export default schemas
