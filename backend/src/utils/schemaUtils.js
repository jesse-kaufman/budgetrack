/** @file Schema utility functions. */
import { routeDefinition, schemaDefinition } from "#config/schemaDefinitions.js"
import logger from "./logger.js"

/**
 * Validates property type.
 * @param {any} value - Value to validate.
 * @param {*} expected - Expected type of value.
 * @returns {boolean} True if valid, otherwise false.
 */
const validatePropType = (value, expected) =>
  (expected === String && typeof value === "string") ||
  (expected === Number && typeof value === "number") ||
  (expected === Boolean && typeof value === "boolean") ||
  (expected === Array && Array.isArray(value)) ||
  // Value is an instance of expected class
  value instanceof expected

/**
 * Validates property value against the property's validation rules.
 * @param {string} name - Name of property being checked.
 * @param {object} rules - Validation rules for property being checked.
 * @param {object} rules.type - Expected property value type.
 * @param {object} [rules.required] - True if property being checked is required.
 * @param {*} value - Property value to validate.
 * @throws {Error} If property value does not match property rules.
 */
const validateProp = (name, { type, required }, value) => {
  // Check if property is missing
  if (required && value == null) {
    throw new Error(`Missing required property: ${name}`)
  }

  // If property is set, check the value against the expected type
  if (value != null && !validatePropType(value, type)) {
    throw new Error(`Invalid type for ${name}: expected ${type.name}`)
  }
}

/**
 * Validates routes in schema object.
 * @param {Array[]} routes - Array of routes to validate.
 * @param {?boolean} registerRoutes - If false, skip registering routes.
 * @throws {Error} If route is invalid.
 */
const validateRoutes = (routes, registerRoutes) => {
  // Skip registering routes
  if (registerRoutes === false) return

  if (!Array.isArray(routes)) throw new Error(`routes must be an array`)

  routes.forEach((route, i) => {
    for (const [prop, rules] of Object.entries(routeDefinition)) {
      try {
        validateProp(prop, rules, route[prop])
      } catch (e) {
        throw new Error(`Route[${i}]: ${e.message}`)
      }
    }
  })
}

/**
 * Validates a schema object.
 * @param {object} schema - Schema to validate.
 * @returns {void}
 * @throws {Error} If schema fails validation.
 */
export const validateSchema = (schema) => {
  // Invalid if schema is not set
  if (!schema) throw new Error("Schema is empty")

  // Validate schema object properties
  for (const [prop, rules] of Object.entries(schemaDefinition)) {
    if (prop === "routes") {
      validateRoutes(schema[prop], schema.registerRoutes)
      continue
    }

    validateProp(prop, rules, schema[prop])
  }
}

/**
 * Returns the default value for a given schema property.
 * If defaultValue is a function, call the function and return the value.
 * Otherwise, return the default value as-is.
 * @param {any|Function} defaultValue - Property object.
 * @param {*} schema - Schema object.
 * @returns {any} Default value for property.
 */
const getDefaultValue = (defaultValue, schema) =>
  typeof defaultValue === "function" ? defaultValue(schema) : defaultValue

/**
 * Creates a complete schema object based on raw input by doing the following:
 * - Assigns defaults based on schema definition
 * - Validates the resulting object structure against schema definition.
 * @param {object} schema - Shallow copy of raw schema data imported from #schemas/*Schema.js file.
 * @returns {object|void} Complete schema object with defaults set.
 * @throws {Error} If schema fails validation.
 */
export const initSchema = (schema) => {
  const _schema = { ...schema }
  logger.debug(`Creating schema: ${schema.name}`)

  for (const [prop, rules] of Object.entries(schemaDefinition)) {
    // Check if property is missing and definition contains a default
    if (!(prop in _schema) && "default" in rules) {
      // Set property to default value
      _schema[prop] = getDefaultValue(rules.default, _schema)
    }
  }

  // Validate and then return initialized schema or throw error if invalid
  try {
    validateSchema(_schema)
    return _schema
  } catch (e) {
    throw new Error(`Validation failed: ${e.message}`)
  }
}
