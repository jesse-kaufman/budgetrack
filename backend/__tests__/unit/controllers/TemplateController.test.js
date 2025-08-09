/** @file Unit tests for TemplateController. */
import { describe, expect, it } from "vitest"
import BaseController from "#controllers/BaseController.js"
import TemplateController from "#controllers/TemplateController.js"
import TemplateService from "#services/TemplateService.js"

describe("TemplateController", () => {
  it("extends BaseController", () => {
    const controller = new TemplateController()
    expect(controller).toBeInstanceOf(BaseController)
  })

  it("constructs with a TemplateService instance", () => {
    const controller = new TemplateController()
    /*
     * Access the private service property
     * Since service is public in BaseController, we can check its constructor
     */
    expect(controller.service).toBeInstanceOf(TemplateService)
  })
})
