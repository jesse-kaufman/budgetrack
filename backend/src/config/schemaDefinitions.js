/** @file Schema definitions for validation and schema creation. */

/**
 * Schema route definition.
 * @typedef {object} RouteDefinition
 * @property {string} path - Route path (required).
 * @property {string} method - HTTP method (required).
 * @property {string} [handler] - Name of optional handler function.
 * @property {Function} [middleware] - Optional middleware function.
 */

/** @type {object} Definition of schema route structure. */
export const routeDefinition = {
  //
  // Required properties
  //
  path: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  handler: {
    type: String,
    required: true,
  },
  //
  // Optional properties
  //
  middleware: {
    type: Function,
  },
}

/** @type {object} Definition of schema structure. */
export const schemaDefinition = {
  //
  // Required properties
  //
  name: {
    type: String,
    required: true,
  },
  routes: {
    type: Array,
    required: true,
  },
  columns: {
    type: Object,
    required: true,
  },
  //
  // Optional properties
  //
  pluralName: {
    type: String,
    default: (schema) => `${schema.name}s`,
  },
  tableName: {
    type: String,
    default: (schema) => schema.pluralName.toLowerCase(),
  },
  endpoint: {
    type: String,
    default: (schema) => schema.tableName,
  },
  relations: {
    type: Object,
  },
  registerRepository: {
    type: Boolean,
    default: true,
  },
  registerService: {
    type: Boolean,
    default: true,
  },
  skipActiveFilter: {
    type: Boolean,
    default: false,
  },
}
