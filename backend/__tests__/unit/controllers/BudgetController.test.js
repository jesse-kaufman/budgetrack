/** @file Unit tests for BudgetController. */
import { describe, expect, it } from "vitest"
import BaseController from "#controllers/BaseController.js"
import BudgetController from "#controllers/BudgetController.js"
import BudgetService from "#services/BudgetService.js"

describe("BudgetController", () => {
  it("extends BaseController", () => {
    const controller = new BudgetController()
    expect(controller).toBeInstanceOf(BaseController)
  })

  it("constructs with a BudgetService instance", () => {
    const controller = new BudgetController()
    /*
     * Access the private service property
     * Since service is public in BaseController, we can check its constructor
     */
    expect(controller.service).toBeInstanceOf(BudgetService)
  })
})
