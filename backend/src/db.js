/** @file Data source config. */
import { DataSource } from "typeorm"
import dbConfig from "#config/db.js"
import Project from "#models/Project.js"
import ProjectCostItem from "#models/ProjectCostItem.js"
import Template from "#models/Template.js"
import TemplateItem from "#models/TemplateItem.js"
import logger from "#utils/logger.js"

/**
 * Validates database configuration.
 * @throws {Error} If any required configurations are missing.
 */
const validateConfig = () => {
  if (["sqlite", "better-sqlite3"].includes(dbConfig.type)) {
    if (!dbConfig.database) {
      throw new Error("Missing required DB config: database (SQLite file path)")
    }
    return
  }

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
  entities: [Template, TemplateItem, Project, ProjectCostItem],
})

db.initialize()
  .then(() => {
    logger.info("Data Source initialized")
  })
  .catch((err) => {
    logger.error("Data Source initialization error:", err)
  })

export default db
