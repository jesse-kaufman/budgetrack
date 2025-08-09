/** @file Project repository. */
import BaseRepository from "./BaseRepository.js"
import db from "#config/dataSource.js"
import Project from "#models/Project.js"

/**
 * ProjectRepository class extending BaseRepository for Project entity.
 */
export default class ProjectRepository extends BaseRepository {
  /**
   * Creates an instance of ProjectRepository.
   */
  constructor() {
    super(db.getRepository(Project))
    this.defaultRelations = ["costs"]
  }
}
