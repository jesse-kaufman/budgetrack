/** @file Unit tests for BaseController. */
import { StatusCodes } from "http-status-codes"
import { beforeEach, describe, expect, it, vi } from "vitest"
import BaseController from "#controllers/BaseController.js"
import { NotFoundError } from "#utils/errors.js"

describe("BaseController", () => {
  let controller = null,
    reqMock = null,
    resMock = null,
    serviceMock = null

  beforeEach(() => {
    serviceMock = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
    resMock = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      end: vi.fn(),
    }
    reqMock = {
      query: {},
      params: {},
      body: {},
    }
    controller = new BaseController(serviceMock)
  })

  it("getAll responds with found items", async () => {
    const items = [{ id: 1 }]
    serviceMock.findAll.mockResolvedValue(items)
    reqMock.query.show = "active"
    await controller.getAll(reqMock, resMock)
    expect(serviceMock.findAll).toHaveBeenCalledWith({ show: "active" })
    expect(resMock.json).toHaveBeenCalledWith(items)
  })

  it("responds with 404 if item not found", async () => {
    const req = { params: { id: 1 } }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
    const next = vi.fn()

    // Mock service.findById to throw NotFoundError
    const service = {
      findById: vi.fn().mockRejectedValue(new NotFoundError("Not found")),
    }
    const c = new BaseController(service)

    await c.getById(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: "Not found" })
  })

  it("getById responds with found item", async () => {
    const item = { id: 1 }
    serviceMock.findById.mockResolvedValue(item)
    reqMock.params.id = 1
    await controller.getById(reqMock, resMock)
    expect(resMock.json).toHaveBeenCalledWith(item)
  })

  it("create responds with 201 and created entity", async () => {
    const created = { id: 1 }
    serviceMock.create.mockResolvedValue(created)
    reqMock.body = { foo: "bar" }
    await controller.create(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(StatusCodes.CREATED)
    expect(resMock.json).toHaveBeenCalledWith(created)
  })

  it("update responds with updated entity", async () => {
    const updated = { id: 1 }
    serviceMock.update.mockResolvedValue(updated)
    reqMock.params.id = 1
    reqMock.body = { foo: "baz" }
    await controller.update(reqMock, resMock)
    expect(resMock.json).toHaveBeenCalledWith(updated)
  })

  it("delete responds with 204 no content", async () => {
    serviceMock.delete.mockResolvedValue()
    reqMock.params.id = 1
    await controller.delete(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT)
    expect(resMock.end).toHaveBeenCalled()
  })

  it("handles NotFoundError with correct status code", async () => {
    const error = new NotFoundError("Not found error")
    serviceMock.findAll.mockRejectedValue(error)
    await controller.getAll(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(error.statusCode)
    expect(resMock.json).toHaveBeenCalledWith({ error: error.message })
  })

  it("handles generic errors with 500", async () => {
    const error = new Error("Generic error")
    serviceMock.findAll.mockRejectedValue(error)
    await controller.getAll(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    )
    expect(resMock.json).toHaveBeenCalledWith({ error: error.message })
  })

  it("update handles errors via #handleError", async () => {
    const error = new Error("Update error")
    serviceMock.update.mockRejectedValue(error)
    reqMock.params.id = 1
    reqMock.body = { foo: "bar" }
    await controller.update(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    )
    expect(resMock.json).toHaveBeenCalledWith({ error: error.message })
  })

  it("delete handles errors via #handleError", async () => {
    const error = new Error("Delete error")
    serviceMock.delete.mockRejectedValue(error)
    reqMock.params.id = 1
    await controller.delete(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    )
    expect(resMock.json).toHaveBeenCalledWith({ error: error.message })
  })

  it("handles NotFoundError properly in #handleError", async () => {
    const error = new NotFoundError("Not found error")
    // Force call to #handleError by causing service.findAll to throw NotFoundError
    serviceMock.findAll.mockRejectedValue(error)
    await controller.getAll(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(error.statusCode)
    expect(resMock.json).toHaveBeenCalledWith({ error: error.message })
  })

  it("handles generic errors properly in #handleError", async () => {
    const error = new Error("Generic error")
    serviceMock.findAll.mockRejectedValue(error)
    await controller.getAll(reqMock, resMock)
    expect(resMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    )
    expect(resMock.json).toHaveBeenCalledWith({ error: error.message })
  })

  it("calls #handleError when service.findById throws", async () => {
    const error = new Error("fail")
    serviceMock.findById.mockRejectedValue(error)

    await controller.getById({ params: { id: 1 }, query: {} }, resMock)

    expect(serviceMock.findById).toHaveBeenCalled()
    expect(resMock.status).toHaveBeenCalledWith(500)
    expect(resMock.json).toHaveBeenCalledWith({ error: "fail" })
  })

  it("calls #handleError when service.create throws", async () => {
    const error = new Error("fail")
    serviceMock.create.mockRejectedValue(error)

    await controller.create({ body: { foo: "bar" } }, resMock)

    expect(serviceMock.create).toHaveBeenCalledWith({ foo: "bar" })
    expect(resMock.status).toHaveBeenCalledWith(500)
    expect(resMock.json).toHaveBeenCalledWith({ error: "fail" })
  })
})
