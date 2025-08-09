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
