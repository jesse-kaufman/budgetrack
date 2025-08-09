/** @file Unit tests for ProjectRepository. */
import { describe, expect, it, vi } from "vitest"
import db from "#config/dataSource.js"
import BaseRepository from "#repositories/BaseRepository.js"
import ProjectRepository from "#repositories/ProjectRepository.js"

// Mock BaseRepository constructor to track calls
vi.mock("#repositories/BaseRepository.js", () => ({
  default: vi.fn().mockImplementation(() => ({})),
}))

// Mock db.getRepository to return a dummy repository object
vi.mock("#config/dataSource.js", () => ({
  default: {
    getRepository: vi.fn(),
  },
}))

describe("ProjectRepository", () => {
  it("calls BaseRepository with Project repository and sets defaultRelations", () => {
    const fakeRepo = {}
    db.getRepository.mockReturnValue(fakeRepo)

    const projectRepo = new ProjectRepository()

    // BaseRepository constructor called with the repository from db.getRepository(Project)
    expect(BaseRepository).toHaveBeenCalledWith(fakeRepo)

    // DefaultRelations is set to ["costs"]
    expect(projectRepo.defaultRelations).toEqual(["costs"])
  })
})
