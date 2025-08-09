/** @file Unit tests for JSON parser middleware. */
import express from "express"
import { StatusCodes } from "http-status-codes"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import parseJson from "#middlewares/parseJson.js"

describe("parseJson middleware", () => {
  /**
   * Helper function to create mocks.
   * @param {string} method - HTTP method.
   * @returns {object} Object containing req, res, and next().
   */
  const createMocks = (method = "POST") => {
    const req = {
      method,
      headers: { "content-type": "application/json" },
    }
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(() => res),
    }
    const next = vi.fn()
    return { req, res, next }
  }

  // Mock express.json so you control the callback calls
  let jsonMock = null
  beforeEach(() => {
    jsonMock = vi
      .spyOn(express, "json")
      .mockImplementation(() => (req, res, callback) => {
        callback(null)
      })
  })

  afterEach(() => {
    jsonMock.mockRestore()
  })

  it("skips parsing and calls next for methods other than POST, PUT, PATCH", () => {
    const { req, res, next } = createMocks("GET")
    const middleware = parseJson()

    middleware(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
  })

  it("calls next on successful JSON parse", () => {
    const { req, res, next } = createMocks("POST")
    const middleware = parseJson()

    middleware(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it("responds with 400 and error JSON on parse error", () => {
    jsonMock.mockImplementation(() => (req, res, callback) => {
      callback(new Error("Invalid JSON"))
    })

    const { req, res, next } = createMocks("POST")
    const middleware = parseJson()

    middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid JSON",
      message: "Invalid JSON",
    })
    expect(next).not.toHaveBeenCalled()
  })
})
