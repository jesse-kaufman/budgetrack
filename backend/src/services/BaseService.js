/** @file Base service class. */
import { toUpperFirst } from "shared/text"
import { BadRequestError, NotFoundError } from "#utils/errors.js"
import logger from "#utils/logger.js"

/**
 * BaseService class providing common service operations.
 */
export default class BaseService {
  #repository = null
  #name = ""
  #skipUpdatedOnRefresh = false
  #pluralName = ""
  #notFoundMessage = `${toUpperFirst(this.#name)} not found`

  /**
   * Creates an instance of BaseService.
   * @param {object} repository - Repository instance to handle data operations.
   * @param {object} schema - Configuration options.
   */
  constructor(repository, schema) {
    if (!repository) {
      logger.error("Repository instance is required")
      throw new Error("Repository instance is required")
    }

    this.#repository = repository ?? null
    this.#name = schema.name ?? this.#repository.constructor.name
    this.#skipUpdatedOnRefresh = schema.skipUpdatedOnRefresh ?? false
    this.#pluralName = schema.pluralName ?? `${schema.name}s`
  }

  /**
   * Handles SQLite-specific errors.
   * @param {object} e - Error object.
   * @returns {void}
   */
  #getSqliteError = (e) => {
    const msg = e.driverError?.message || ""

    // Handle SQL NULL constraint errors
    if (e.code === "SQLITE_CONSTRAINT_NOTNULL") {
      const match = msg.match(/constraint failed: (.*)\.([^\s]+)/)
      const field = match ? match[2] : "unknown"
      const table = match[1] === "budgetItems" ? "budget item" : this.#name
      return `Missing ${field} field on ${table}`
    }

    // Handle SQL NULL constraint errors
    if (e.code === "SQLITE_CONSTRAINT_CHECK") {
      const match = msg.match(/constraint failed: ([^\s]+)/)
      const field = match ? match[1] : "unknown"
      return `Invalid value for ${field}`
    }
  }

  /**
   * Handle errors and throw normalized errors.
   * @param {object} e - Error object.
   * @returns {void}
   */
  #handleError = (e) => {
    logger.error(`${e.code} - ${e.message}`)

    if (e instanceof NotFoundError) throw e

    // Handle SQLite errors
    if (e.code.startsWith("SQLITE_CONSTRAINT_")) {
      throw new Error(this.#getSqliteError(e))
    }

    // Fall back to generic error
    throw new Error(`Failed to update ${this.#name}`)
  }

  /**
   * Finds all entities with optional filtering.
   * @param {object} options - Find options for querying.
   * @returns {Promise<Array>} - Array of found entities.
   */
  async findAll(options = {}) {
    try {
      return await this.#repository.findAll(options)
    } catch (e) {
      logger.error(e.message)
      throw new Error(`Failed to fetch all ${this.#pluralName}`)
    }
  }

  /**
   * Finds an entity by its ID.
   * @param {number} id - Entity ID.
   * @param {object} options - Additional find options.
   * @returns {Promise<object|null>} - Found entity or null if not found.
   * @throws {Error} - If ID is not provided.
   */
  async findById(id, options = {}) {
    if (!id) throw new BadRequestError("ID is required")
    try {
      const result = await this.#repository.findById(id, options)
      if (!result) throw new NotFoundError(this.#notFoundMessage)
      return result
    } catch (e) {
      this.#handleError(e)
    }
  }

  /**
   * Creates a new entity.
   * @param {object} data - Data to create a new entity.
   * @returns {Promise<object>} - Created entity.
   * @throws {Error} - If data is not provided.
   */
  async create(data) {
    if (!data) throw new BadRequestError("Data is required")
    try {
      return await this.#repository.create(data)
    } catch (e) {
      logger.error(e.message)
      throw new Error(`Failed to create new ${this.#name}`)
    }
  }

  /**
   * Updates an existing entity.
   * @param {number} id - Entity ID to update.
   * @param {object} data - Data to update the entity.
   * @returns {Promise<object>} - Updated entity.
   * @throws {Error} - If ID or data is not provided.
   * @throws {NotFoundError} - If entity with the given ID is not found.
   */
  async update(id, data) {
    if (!id) throw new BadRequestError("ID is required")
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError("Data is required")
    }

    // Attempt to update the entity
    try {
      const updated = await this.#repository.update(id, data)

      // If no entity was updated, throw NotFoundError
      if (!updated) throw new NotFoundError(this.#notFoundMessage)

      if (!this.#skipUpdatedOnRefresh) {
        await this.#repository.update(id, {
          updatedOn: () => "CURRENT_TIMESTAMP",
        })
      }

      // Return the updated entity
      return this.findById(id)
    } catch (e) {
      this.#handleError(e)
    }
  }

  /**
   * Deletes an entity by its ID.
   * @param {number} id - Entity ID to delete.
   * @throws {Error} - If ID is not provided.
   * @throws {NotFoundError} - If entity with the given ID is not found.
   */
  async delete(id) {
    if (!id) throw new Error("ID is required")
    try {
      const deleted = await this.#repository.delete(id)
      // If no entity was deleted, throw NotFoundError
      if (!deleted) throw new NotFoundError(this.#notFoundMessage)
    } catch (e) {
      this.#handleError(e)
    }
  }
}
