/** @file Template repository. */
import BaseRepository from "./BaseRepository.js"
import db from "#src/db.js"
import Template from "#models/Template.js"

/**
 * TemplateRepository class extending BaseRepository for Template entity.
 */
export default class TemplateRepository extends BaseRepository {
  /**
   * Creates an instance of TemplateRepository.
   */
  constructor() {
    super(db.getRepository(Template))
    this.defaultRelations = ["costs"]
  }
}
