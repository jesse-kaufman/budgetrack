/** @file Data source config. */
import { DataSource } from "typeorm"
import dbConfig from "#config/db.js"
import models from "#registries/model.js"
import logger from "#utils/logger.js"

/**
 * Validates database configuration.
 * @throws {Error} If any required configurations are missing.
 */
const validateConfig = () => {
  // Validate config for SQLite
  if (["sqlite", "better-sqlite3"].includes(dbConfig.type)) {
    if (!dbConfig.database) {
      throw new Error("Missing required DB config: database (SQLite file path)")
    }
    return
  }

  // Validate config for SQL Server
  if (dbConfig.type === "mssql") {
    const required = ["hostname", "username", "password", "database"]
    for (const key of required) {
      if (!dbConfig[key]) {
        throw new Error(`Missing required DB config: ${key}`)
      }
    }
    return
  }

  // Throw if DB not in list
  throw new Error(`Unsupported DB type: ${dbConfig.type}`)
}

validateConfig()

logger.info(`Connecting to ${dbConfig.type} server: ${dbConfig.host}...`)

// Export TypeORM DataSource by default
const db = new DataSource({
  ...dbConfig,
  entities: Object.values(models),
})

try {
  db.initialize()
  logger.success("Data Source initialized")
} catch (e) {
  logger.error("Data Source initialization error:", e)
}

export default db
