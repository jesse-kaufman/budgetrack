/** @file Database utility functions. */

/**
 * Gets correct boolean column type based on the type of database.
 * @param {string} dbType - Type of the database (e.g., 'mssql').
 * @returns {string} - The correct boolean type for the database.
 */
export const getBooleanType = (dbType) =>
  dbType === "mssql" ? "bit" : "boolean"

/**
 * Gets correct datetime column type based on the type of database.
 * @param {string} dbType - Type of the database (e.g., 'mssql').
 * @returns {string} - The correct datetime type for the database.
 */
export const getDatetimeType = (dbType) =>
  dbType === "mssql" ? "datetime2" : "datetime"

/**
 * Appends file extension to database name depending on database type.
 * @param {string} name - Database name set in config.
 * @param {string} type - Database type.
 * @returns {string} Database file name with extension if applicable.
 */
export const getDbName = (name, type) => {
  const isSqlite = ["sqlite", "better-sqlite3"].includes(type)

  // Append .sqlite to SQLite databases if not already included
  if (isSqlite && !name.endsWith(".sqlite")) return `${name}.sqlite`

  // Return db name as-is
  return name
}

/**
 * Validates database configuration.
 * @param {object} config - Database configuration object to validate.
 * @throws {Error} If any required configurations are missing.
 */
export const validateConfig = (config) => {
  // Validate config for SQLite
  if (["sqlite", "better-sqlite3"].includes(config.type)) {
    if (!config.database) {
      throw new Error("Missing required DB config: database (SQLite file path)")
    }
    return
  }

  // Validate config for SQL Server
  if (config.type === "mssql") {
    const required = ["host", "username", "password", "database"]
    for (const key of required) {
      if (!config[key]) {
        throw new Error(`Missing required DB config: ${key}`)
      }
    }
    return
  }

  // Throw if DB not in list
  throw new Error(`Unsupported DB type: ${config.type}`)
}
