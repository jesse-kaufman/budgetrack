/** @file Project controller. */
import BaseController from "#controllers/BaseController.js"
import ProjectService from "#services/ProjectService.js"

/**
 * ProjectController class extending BaseController for /projects endpoint.
 */
export default class ProjectController extends BaseController {
  /**
   * Creates an instance of ProjectController.
   */
  constructor() {
    super(new ProjectService())
  }
}
