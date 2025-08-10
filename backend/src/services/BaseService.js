/** @file Base service class. */
import { BadRequestError, NotFoundError } from "#utils/errors.js"

/**
 * BaseService class providing common service operations.
 */
export default class BaseService {
  /**
   * Creates an instance of BaseService.
   * @param {object} repository - Repository instance to handle data operations.
   */
  constructor(repository) {
    if (!repository) throw new Error("Repository instance is required")
    this.repository = repository
  }

  /**
   * Finds all entities with optional filtering.
   * @param {object} options - Find options for querying.
   * @returns {Array} - Array of found entities.
   */
  findAll(options = {}) {
    return this.repository.findAll(options)
  }

  /**
   * Finds an entity by its ID.
   * @param {number} id - Entity ID.
   * @param {object} options - Additional find options.
   * @returns {object|null} - Found entity or null if not found.
   * @throws {Error} - If ID is not provided.
   */
  async findById(id, options = {}) {
    if (!id) throw new BadRequestError("ID is required")
    const result = await this.repository.findById(id, options)
    if (!result) throw new NotFoundError(`Entity with ID ${id} not found`)
    return result
  }

  /**
   * Creates a new entity.
   * @param {object} data - Data to create a new entity.
   * @returns {object} - Created entity.
   * @throws {Error} - If data is not provided.
   */
  create(data) {
    if (!data) throw new BadRequestError("Data is required")
    return this.repository.create(data)
  }

  /**
   * Updates an existing entity.
   * @param {number} id - Entity ID to update.
   * @param {object} data - Data to update the entity.
   * @returns {object} - Updated entity.
   * @throws {Error} - If ID or data is not provided.
   * @throws {NotFoundError} - If entity with the given ID is not found.
   */
  async update(id, data) {
    if (!id) throw new BadRequestError("ID is required")
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError("Data is required")
    }

    // Attempt to update the entity
    const updated = await this.repository.update(id, data)
    // If no entity was updated, throw NotFoundError
    if (!updated) throw new NotFoundError(`Entity with ID ${id} not found`)

    // Return the updated entity
    return updated
  }

  /**
   * Deletes an entity by its ID.
   * @param {number} id - Entity ID to delete.
   * @throws {Error} - If ID is not provided.
   * @throws {NotFoundError} - If entity with the given ID is not found.
   */
  async delete(id) {
    if (!id) throw new Error("ID is required")
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new NotFoundError(`Entity with ID ${id} not found`)
  }
}
