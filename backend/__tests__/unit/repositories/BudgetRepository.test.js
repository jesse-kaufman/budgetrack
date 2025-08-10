/** @file Unit tests for BudgetRepository. */
import { describe, expect, it, vi, beforeEach } from "vitest"
import db from "#src/db.js"
import BaseRepository from "#repositories/BaseRepository.js"
import BudgetRepository from "#repositories/BudgetRepository.js"

// Clear mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})

// Mock BaseRepository constructor to track calls
vi.mock("#repositories/BaseRepository.js", () => ({
  default: vi.fn().mockImplementation(() => ({})),
}))

// Mock db.getRepository to return a dummy repository object
vi.mock("#src/db.js", () => ({
  default: {
    getRepository: vi.fn(),
  },
}))

describe("BudgetRepository", () => {
  it("calls BaseRepository with Budget repository and sets defaultRelations", () => {
    const fakeRepo = {}
    db.getRepository.mockReturnValue(fakeRepo)

    // Instantiate BudgetRepository (which calls BaseRepository constructor)
    // eslint-disable-next-line no-unused-vars
    const tmp = new BudgetRepository()

    // BaseRepository constructor should be called once with correct args
    expect(BaseRepository).toHaveBeenCalledTimes(1)
    expect(BaseRepository).toHaveBeenCalledWith(fakeRepo, {
      defaultRelations: ["items"],
      skipActiveFilter: true,
    })
  })
})
