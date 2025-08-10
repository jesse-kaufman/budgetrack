/** @file Budget controller. */
import BaseController from "#controllers/BaseController.js"
import BudgetService from "#services/BudgetService.js"

/**
 * BudgetController class extending BaseController for /Budgets endpoint.
 */
export default class BudgetController extends BaseController {
  /**
   * Creates an instance of BudgetController.
   */
  constructor() {
    super(new BudgetService())
  }
}
