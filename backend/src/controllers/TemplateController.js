/** @file Template controller. */
import BaseController from "#controllers/BaseController.js"
import TemplateService from "#services/TemplateService.js"

/**
 * TemplateController class extending BaseController for /templates endpoint.
 */
export default class TemplateController extends BaseController {
  /**
   * Creates an instance of TemplateController.
   */
  constructor() {
    super(new TemplateService())
  }
}
