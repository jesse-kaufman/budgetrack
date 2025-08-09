/** @file Unit tests for TemplateRepository. */
import { describe, expect, it, vi } from "vitest"
import db from "#src/db.js"
import BaseRepository from "#repositories/BaseRepository.js"
import TemplateRepository from "#repositories/TemplateRepository.js"

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

describe("TemplateRepository", () => {
  it("calls BaseRepository with Template repository and sets defaultRelations", () => {
    const fakeRepo = {}
    db.getRepository.mockReturnValue(fakeRepo)

    const templateRepo = new TemplateRepository()

    // BaseRepository constructor called with the repository from db.getRepository(Template)
    expect(BaseRepository).toHaveBeenCalledWith(fakeRepo)

    // DefaultRelations is set to ["costs"]
    expect(templateRepo.defaultRelations).toEqual(["costs"])
  })
})
