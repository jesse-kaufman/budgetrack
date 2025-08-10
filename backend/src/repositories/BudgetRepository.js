/** @file Budget repository. */
import BaseRepository from "./BaseRepository.js"
import db from "#src/db.js"
import Budget from "#models/Budget.js"

/**
 * BudgetRepository class extending BaseRepository for Budget entity.
 */
export default class BudgetRepository extends BaseRepository {
  /**
   * Creates an instance of BudgetRepository.
   */
  constructor() {
    super(db.getRepository(Budget))
  }
}
