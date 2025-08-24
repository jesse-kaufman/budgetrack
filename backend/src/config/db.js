/** @file Database config. */
import { nodeEnv } from "#config/config.js"
import { getDbName } from "#utils/dbUtils.js"

/** Database type; defaults to mssql. */
const type = process.env.DB_TYPE || "better-sqlite3"
/** Database host. */
const host = process.env.DB_HOST || ""
/** Database port; defaults to 1433. */
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433
/** Database user. */
const username = process.env.DB_USER || ""
/** Database password. */
const password = process.env.DB_PASS || ""
/** Database name. */
const database = getDbName(process.env.DB_NAME || "database", type)
/** Whether to enable database logging. */
const logging = process.env.DB_LOGGING === "true"
/** Whether to enable TypeORM's database sync. */
const synchronize = process.env.DB_SYNCHRONIZE === "true"
/** Where to store migrations. */
const migrations = [`migrations/${nodeEnv}/*.{js,ts}`]

/** Boolean column type for configured database type. */
export const booleanType = type === "mssql" ? "bit" : "boolean"
/** Datetime column type for the configured database type. */
export const datetimeType = type === "mssql" ? "datetime2" : "datetime"

/** Additional TypeORM database options. */
const options = {
  encrypt: true,
  trustServerCertificate: true,
}

// Export database connection configuration
export default {
  type,
  host,
  port,
  username,
  password,
  database,
  logging,
  synchronize,
  migrations,
  options,
  booleanType,
  datetimeType,
}
