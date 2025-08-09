/** @file Project service. */
import db from "#src/db.js"
import Project from "#models/Project.js"
import ProjectRepository from "#repositories/ProjectRepository.js"
import BaseService from "#services/BaseService.js"

/**
 * ProjectService class extending BaseService for Project entity.
 */
export default class ProjectService extends BaseService {
  /**
   * Creates an instance of ProjectService.
   */
  constructor() {
    const projectRepo = new ProjectRepository(db.getRepository(Project))
    super(projectRepo)
  }
}
