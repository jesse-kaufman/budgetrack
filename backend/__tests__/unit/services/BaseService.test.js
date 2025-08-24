/** @file Unit tests for BaseService. */
import { beforeEach, describe, expect, it, vi } from "vitest"
import BaseService from "#services/BaseService.js"
import { NotFoundError } from "#utils/errors.js"

describe("BaseService", () => {
  let repoMock = null
  let service = null

  beforeEach(() => {
    repoMock = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
    service = new BaseService(repoMock, { name: "item", pluralName: "items" })
  })

  describe("constructor", () => {
    it("throws if repository not provided", () => {
      expect(() => new BaseService()).toThrow("Repository instance is required")
    })
  })

  describe("findAll", () => {
    it("calls repository.findAll with options", async () => {
      const options = { foo: "bar" }
      await service.findAll(options)
      expect(repoMock.findAll).toHaveBeenCalledWith(options)
    })
  })

  describe("findById", () => {
    it("throws if id not provided", async () => {
      await expect(service.findById()).rejects.toThrow("ID is required")
    })

    it("calls repository.findById and returns result", async () => {
      const options = { show: "all" }
      const fakeItem = { id: 1, name: "foo" }
      repoMock.findById.mockResolvedValue(fakeItem)

      const result = await service.findById(1, options)

      expect(repoMock.findById).toHaveBeenCalledWith(1, options)
      expect(result).toBe(fakeItem)
    })
  })

  describe("create", () => {
    it("throws if data not provided", async () => {
      await expect(service.create()).rejects.toThrow("Data is required")
    })

    it("calls repository.create with data", async () => {
      const data = { foo: "bar" }
      repoMock.create.mockResolvedValue(data)
      await service.create(data)
      expect(repoMock.create).toHaveBeenCalledWith(data)
    })
  })

  describe("update", () => {
    it("throws if id not provided", async () => {
      await expect(service.update(null, {})).rejects.toThrow("ID is required")
    })

    it("throws if data not provided or empty", async () => {
      await expect(service.update(1, null)).rejects.toThrow("Data is required")
      await expect(service.update(1, {})).rejects.toThrow("Data is required")
    })

    it("throws NotFoundError if repository.update returns falsy", async () => {
      repoMock.update.mockResolvedValue(null)
      await expect(service.update(1, { foo: "bar" })).rejects.toBeInstanceOf(
        NotFoundError
      )
    })

    it("calls update twice and findById, returns updated entity", async () => {
      service = new BaseService(repoMock, {
        name: "item",
        pluralName: "items",
        skipUpdatedOnRefresh: false,
      })

      const updatedEntity = { id: 1, foo: "bar" }

      repoMock.update.mockResolvedValueOnce(updatedEntity)
      repoMock.update.mockResolvedValueOnce(updatedEntity)
      repoMock.findById.mockResolvedValue(updatedEntity)

      const result = await service.update(1, { foo: "bar" })

      expect(repoMock.update).toHaveBeenNthCalledWith(1, 1, { foo: "bar" })
      expect(repoMock.update).toHaveBeenNthCalledWith(2, 1, {
        updatedOn: expect.any(Function),
      })
      expect(repoMock.findById).toHaveBeenCalledWith(1, {}) // <-- THIS FIXES IT
      expect(result).toBe(updatedEntity)
    })

    it("skips updatedOn refresh if skipUpdatedOnRefresh is true", async () => {
      service = new BaseService(repoMock, {
        name: "item",
        pluralName: "items",
        skipUpdatedOnRefresh: true,
      })

      const updatedEntity = { id: 1, foo: "bar" }

      repoMock.update.mockResolvedValue(updatedEntity)
      repoMock.findById.mockResolvedValue(updatedEntity)

      const result = await service.update(1, { foo: "bar" })

      expect(repoMock.update).toHaveBeenCalledTimes(1)
      expect(repoMock.update).toHaveBeenCalledWith(1, { foo: "bar" })
      expect(repoMock.findById).toHaveBeenCalledWith(1, {})
      expect(result).toBe(updatedEntity)
    })
  })

  describe("delete", () => {
    it("throws if id not provided", async () => {
      await expect(service.delete()).rejects.toThrow("ID is required")
    })

    it("throws NotFoundError if delete returns falsy", async () => {
      repoMock.delete.mockResolvedValue(null)
      await expect(service.delete(1)).rejects.toBeInstanceOf(NotFoundError)
    })

    it("resolves if delete successful", async () => {
      repoMock.delete.mockResolvedValue(true)
      await expect(service.delete(1)).resolves.toBeUndefined()
    })
  })
})
