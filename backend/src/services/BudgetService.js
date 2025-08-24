/** @file Budget service. */
import BaseService from "#services/BaseService.js"

/**
 * BudgetService class extending BaseService for Budget entity.
 */
export default class BudgetService extends BaseService {
  /**
   * Returns the budget object instead of array of objects.
   * @returns {object} Budget object.
   */
  async findAll() {
    const results = await super.findAll()
    return results.length > 0 ? results[0] : null
  }

  /**
   * Gets budget from repository.
   * @returns {object} Budget object.
   */
  async findById() {
    const results = await super.findById(1)
    return results
  }

  /**
   * Updates budget in repository.
   * @param {number} id - Budget ID to update.
   * @param {object} data - Data for budget.
   * @returns {object} Budget object.
   */
  async update(id, data) {
    const results = await super.update(1, data)
    return results
  }
}
