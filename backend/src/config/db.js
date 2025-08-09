/** @file Database config. */

/** Database type; defaults to mssql. */
const type = process.env.DB_TYPE || "mssql"
/** Database host. */
const host = process.env.DB_HOST || ""
/** Database port; defaults to 1433. */
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433
/** Database user. */
const username = process.env.DB_USER || ""
/** Database password. */
const password = process.env.DB_PASS || ""
/** Database name. */
const database = process.env.DB_NAME || ""
/** Whether to enable database logging. */
const logging = process.env.DB_LOGGING === "true"
/** Whether to enable TypeORM's database sync. */
const synchronize = process.env.DB_SYNCHRONIZE === "true"
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
  options,
}
