/** @file Budget service. */
import db from "#src/db.js"
import Budget from "#models/Budget.js"
import BudgetRepository from "#repositories/BudgetRepository.js"
import BaseService from "#services/BaseService.js"

/**
 * BudgetService class extending BaseService for Budget entity.
 */
export default class BudgetService extends BaseService {
  /**
   * Creates an instance of BudgetService.
   */
  constructor() {
    const BudgetRepo = new BudgetRepository(db.getRepository(Budget))
    const config = { name: "budget", pluralName: "budgets" }

    super(BudgetRepo, config)
  }

  /**
   * Returns the budget object instead of array of objects.
   * @returns {object} Budget object.
   */
  async findAll() {
    const results = await super.findAll()
    return results.length > 0 ? results[0] : null
  }
}
