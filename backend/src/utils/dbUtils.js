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
