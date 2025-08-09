/** @file Unit tests for ProjectController. */
import { describe, expect, it } from "vitest"
import BaseController from "#controllers/BaseController.js"
import ProjectController from "#controllers/ProjectController.js"
import ProjectService from "#services/ProjectService.js"

describe("ProjectController", () => {
  it("extends BaseController", () => {
    const controller = new ProjectController()
    expect(controller).toBeInstanceOf(BaseController)
  })

  it("constructs with a ProjectService instance", () => {
    const controller = new ProjectController()
    /*
     * Access the private service property
     * Since service is public in BaseController, we can check its constructor
     */
    expect(controller.service).toBeInstanceOf(ProjectService)
  })
})
