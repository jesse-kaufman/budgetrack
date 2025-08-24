/** @file Validation utility functions. */
import { datetimeType } from "#config/db.js"

/**
 * Validates value of datetime column.
 * @param {string} column - Name of column being validated.
 * @param {*} value - Column value being validated.
 * @throws {Error} If value is not a valid date.
 */
const validateDatetimeColumn = (column, value) => {
  // Verify that value is a Date object and represents a valid date
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error(`${column} must be a valid date`)
  }
}

/**
 * Validates value of string-based column.
 * @param {string} column - Name of column being validated.
 * @param {any} value - Column value being validated.
 * @param {number} length - Maximum allowed column data length.
 * @throws {Error} If value is not a valid string.
 */
const validateStringColumn = (column, value, length) => {
  // Check if column value is a string
  if (typeof value !== "string") throw new Error(`${column} must be a string`)
  // Check column value length
  if (length && value.length > length) {
    throw new Error(`${column} exceeds max length of ${length}`)
  }
}

/**
 * Validates value of integer column.
 * @param {string} column - Name of column being validated.
 * @param {*} value - Column value being validated.
 * @throws {Error} If value is not a valid integer.
 */
const validateIntColumn = (column, value) => {
  if (!Number.isInteger(value)) throw new Error(`${column} must be an integer`)
}

/**
 * Validates value of decimal column.
 * @param {string} column - Name of column being validated.
 * @param {*} value - Column value being validated.
 * @throws {Error} If value is not a valid decimal value.
 */
const validateDecimalColumn = (column, value) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${column} must be a number`)
  }
}

/**
 * Validates value against basic type definition in schema.
 * @param {string} column - Name of column being validated.
 * @param {any} value - Column value being validated.
 * @param {object} colSpec - Column specifications.
 * @param {string} colSpec.type - Column type to validate against.
 * @param {number} colSpec.length - Maximum allowed column data length.
 * @throws {Error} If value does not validate against type specification.
 */
const validateColumnType = (column, value, { type, length }) => {
  if (value == null) return

  // Basic type/length checks
  switch (type) {
    case "nvarchar":
    case "varchar":
    case "nchar":
      validateStringColumn(column, value, length)
      break
    case "int":
      validateIntColumn(column, value)
      break
    case "decimal":
      validateDecimalColumn(column, value)
      break
    case datetimeType:
      validateDatetimeColumn(column, value)
      break
  }
}

/**
 * Validates user input against schema column rules.
 * @param {object} data - Data to validate.
 * @param {*} schema - Schema to validate data against.
 * @throws {Error} If not valid.
 */
const validateSentData = (data, schema) => {
  // Walk through all column definitions in schema.columns
  for (const [column, colDef] of Object.entries(schema.columns)) {
    // Skip generated columns
    if (colDef.generated || colDef.createDate || colDef.updateDate) {
      continue
    }

    // Get value to validate
    const value = data[column]

    // Required / nullable
    if (!colDef.nullable && value == null) {
      throw new Error(`Missing required field: ${column}`)
    }

    // Validate basic data type
    validateColumnType(column, value, colDef)

    // Run custom validator if present
    if (colDef.validate) {
      const result = colDef.validate(value)
      if (result !== true) throw new Error(`${column}: ${result}`)
    }
  }
}

export default validateSentData
