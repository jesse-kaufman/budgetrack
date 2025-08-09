/** @file Unit tests for BaseService. */
import { beforeEach, describe, expect, it, vi } from "vitest"
import NotFoundError from "#errors/NotFoundError.js"
import BaseService from "#services/BaseService.js"

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
    service = new BaseService(repoMock)
  })

  it("throws if repository not provided", () => {
    expect(() => new BaseService()).toThrow("Repository instance is required")
  })

  it("findAll calls repository.findAll with options", () => {
    const options = { foo: "bar" }
    service.findAll(options)
    expect(repoMock.findAll).toHaveBeenCalledWith(options)
  })

  it("findById throws if id not provided", () => {
    expect(() => service.findById()).toThrow("ID is required")
  })

  it("findById calls repository.findById with id and options", () => {
    const options = { show: "all" }
    service.findById(1, options)
    expect(repoMock.findById).toHaveBeenCalledWith(1, options)
  })

  it("create throws if data not provided", () => {
    expect(() => service.create()).toThrow("Data is required")
  })

  it("create calls repository.create with data", () => {
    const data = { foo: "bar" }
    service.create(data)
    expect(repoMock.create).toHaveBeenCalledWith(data)
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

    it("returns updated entity if successful", async () => {
      const updatedEntity = { id: 1, foo: "bar" }
      repoMock.update.mockResolvedValue(updatedEntity)
      const result = await service.update(1, { foo: "bar" })
      expect(result).toBe(updatedEntity)
    })
  })

  describe("delete", () => {
    it("throws if id not provided", async () => {
      await expect(service.delete()).rejects.toThrow("ID is required")
    })

    it("throws NotFoundError if repository.delete returns falsy", async () => {
      repoMock.delete.mockResolvedValue(null)
      await expect(service.delete(1)).rejects.toBeInstanceOf(NotFoundError)
    })

    it("resolves if delete successful", async () => {
      repoMock.delete.mockResolvedValue(true)
      await expect(service.delete(1)).resolves.toBeUndefined()
    })
  })
})
