/** @file Base repository class to be extended. */

/**
 * BaseRepository class providing common database operations.
 */
export default class BaseRepository {
  #repository = null
  #defaultRelations = null
  #skipActiveFilter = null

  /**
   * Creates an instance of BaseRepository.
   * @param {object} repository - TypeORM repository instance.
   * @param {object} config - Config options for class.
   */
  constructor(repository, config) {
    if (!repository) throw new Error("Repository instance is required")
    this.#repository = repository
    this.#defaultRelations = config?.defaultRelations || []
    this.#skipActiveFilter = config?.skipActiveFilter || false
  }

  /**
   * Sets isActive filter based on options.show and merges with existing options.
   * @param {object} options - Find options.
   * @returns {object} - Updated find options with isActive filter.
   */
  #applyActiveFilter(options = {}) {
    // Destructure 'show' from options, leaving the rest intact in _options
    const { show, ..._options } = options

    // Return options as-is if skipActiveFilter is true
    if (this.#skipActiveFilter) return _options

    // Initialize where clause with existing conditions or empty object
    const where = { ...(_options.where || {}) }

    // If 'show' is set to 'all', don't apply the isActive filter
    if (show === "all") delete where.isActive
    // If 'show' is set to 'inactive', retrieve inactive entities
    else if (show === "inactive") where.isActive = false
    // If 'show' is not specified or set to 'active', apply isActive filter
    else where.isActive = true

    // Default case: apply isActive filter to retrieve only active entities
    return { ..._options, where }
  }

  /**
   * Finds all entities with optional filtering.
   * @param {object} options - Find options for querying.
   * @returns {Array} - Array of found entities.
   */
  findAll(options = {}) {
    return this.#repository.find(this.#applyActiveFilter(options))
  }

  /**
   * Finds an entity by its ID.
   * @param {number} id - Entity ID.
   * @param {object} options - Additional find options.
   * @returns {object|null} - Found entity or null if not found.
   */
  findById(id, options = {}) {
    // Find the entity by ID with isActive filter applied
    return this.#repository.findOne(
      this.#applyActiveFilter({
        // Spread existing options
        ...options,
        // Merge with where clause to find by ID
        where: { ...options?.where, id },
        // Include relations by default
        relations: options.relations ?? this.#defaultRelations,
      })
    )
  }

  /**
   * Creates a new entity and returns it.
   * @param {object} data - Data to create the entity.
   * @returns {object} - Created entity.
   */
  async create(data) {
    return await this.#repository.save(this.#repository.create(data))
  }

  /**
   * Updates an existing entity and returns it.
   * @param {number} id - Entity ID.
   * @param {object} data - Data to update the entity.
   * @returns {object} - Updated entity.
   */
  async update(id, data) {
    // Find the entity by ID
    const entity = await this.findById(id)
    // If the entity does not exist, return null
    if (!entity) return null
    // Update the entity with the provided data
    Object.assign(entity, data)
    // Save the updated entity to the database and return it
    return this.#repository.save(entity)
  }

  /**
   * Deletes an entity by its ID.
   * @param {number} id - Entity ID to delete.
   * @returns {object} - Resolves when the entity is marked as deleted.
   */
  delete(id) {
    return this.update(id, { isActive: false })
  }
}
