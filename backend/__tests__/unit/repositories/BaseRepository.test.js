/** @file Unit tests for BaseRepository. */
import { beforeEach, describe, expect, it, vi } from "vitest"
import BaseRepository from "#repositories/BaseRepository.js"

describe("BaseRepository", () => {
  let repoMock = null
  let baseRepo = null

  beforeEach(() => {
    repoMock = {
      find: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
    }
    baseRepo = new BaseRepository(repoMock)
  })

  it("throws if no repository passed", () => {
    expect(() => new BaseRepository()).toThrow(
      "Repository instance is required"
    )
  })

  describe("#applyActiveFilter (indirectly tested)", () => {
    it("adds isActive: true if show not set", () => {
      const options = { where: { foo: "bar" } }
      baseRepo.findAll(options)
      expect(repoMock.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ foo: "bar", isActive: true }),
        })
      )
    })

    it("does not add isActive if show is 'all'", () => {
      baseRepo.findAll({ show: "all", where: { foo: "bar" } })
      expect(repoMock.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.not.objectContaining({ isActive: expect.anything() }),
        })
      )
    })

    it("adds isActive: false if show is 'inactive'", () => {
      baseRepo.findAll({ show: "inactive" })
      expect(repoMock.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: false }),
        })
      )
    })
  })

  describe("findById", () => {
    it("calls repository.findOne with correct params", () => {
      // Pass defaultRelations in constructor
      baseRepo = new BaseRepository(repoMock, { defaultRelations: ["rel1"] })

      const options = { where: { foo: "bar" } }
      baseRepo.findById(123, options)

      expect(repoMock.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            foo: "bar",
            id: 123,
            isActive: true,
          }),
          relations: ["rel1"],
        })
      )
    })

    it("overrides relations if provided", () => {
      baseRepo.findById(123, { relations: ["other"] })
      expect(repoMock.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          relations: ["other"],
        })
      )
    })
  })

  describe("create", () => {
    it("calls repository.create and repository.save", async () => {
      const data = { a: 1 }
      repoMock.create.mockReturnValue(data)
      repoMock.save.mockResolvedValue({ id: 1, ...data })

      const result = await baseRepo.create(data)

      expect(repoMock.create).toHaveBeenCalledWith(data)
      expect(repoMock.save).toHaveBeenCalledWith(data)
      expect(result).toEqual({ id: 1, ...data })
    })
  })

  describe("update", () => {
    it("returns null if entity not found", async () => {
      baseRepo.findById = vi.fn().mockResolvedValue(null)
      const result = await baseRepo.update(1, { foo: "bar" })
      expect(result).toBeNull()
    })

    it("updates entity and saves", async () => {
      const entity = { id: 1, foo: "old" }
      baseRepo.findById = vi.fn().mockResolvedValue(entity)
      repoMock.save.mockResolvedValue({ id: 1, foo: "new" })

      const result = await baseRepo.update(1, { foo: "new" })

      expect(entity.foo).toBe("new")
      expect(repoMock.save).toHaveBeenCalledWith(entity)
      expect(result).toEqual({ id: 1, foo: "new" })
    })
  })

  describe("delete", () => {
    it("calls update with isActive: false", () => {
      baseRepo.update = vi.fn()
      baseRepo.delete(5)
      expect(baseRepo.update).toHaveBeenCalledWith(5, { isActive: false })
    })
  })
})
