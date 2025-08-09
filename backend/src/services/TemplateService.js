/** @file Template service. */
import db from "#src/db.js"
import Template from "#models/Template.js"
import TemplateRepository from "#repositories/TemplateRepository.js"
import BaseService from "#services/BaseService.js"

/**
 * TemplateService class extending BaseService for Template entity.
 */
export default class TemplateService extends BaseService {
  /**
   * Creates an instance of TemplateService.
   */
  constructor() {
    const templateRepo = new TemplateRepository(db.getRepository(Template))
    super(templateRepo)
  }
}
