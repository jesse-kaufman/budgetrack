/** @file Schema registry. */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Registry that maps schema names to schema configuration objects.
 * @type {Record<string, object>}
 */
const schemas = {}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const schemasDir = path.resolve(__dirname, "../schemas")

// Walk through *Schema.js files and import each
const imports = await Promise.all(
  fs
    .readdirSync(schemasDir)
    .filter((f) => f.endsWith("Schema.js"))
    .map((f) => import(path.join(schemasDir, f)))
)

// Walk through imported modules
for (const _import of imports) {
  console.log(`adding ${_import.default.name} to schema registry`)
  schemas[_import.default.name] = _import.default
}

export default schemas
