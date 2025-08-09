/** @file Unit tests for CORS middleware. */
import { StatusCodes } from "http-status-codes"
import { describe, expect, it, vi } from "vitest"
import corsConfig from "#config/cors.js"
import cors from "#middlewares/cors.js"

describe("CORS middleware", () => {
  const allowedOrigin = corsConfig.allowedOrigins[0] || "http://allowed.com"
  const disallowedOrigin = "http://disallowed.com"

  /**
   * Helper to create mocks.
   * @param {object} overrides - Override object.
   * @returns {object} Object containing req, res, and next().
   */
  const createMocks = (overrides = {}) => {
    const req = {
      headers: {},
      method: "GET",
      header: vi.fn((headerName) => req.headers[headerName.toLowerCase()]),
      ...overrides.req,
    }
    const res = {
      header: vi.fn(),
      status: vi.fn(() => res),
      end: vi.fn(),
      ...overrides.res,
    }
    const next = vi.fn()
    return { req, res, next }
  }

  it("sets CORS headers and calls next for allowed origin", () => {
    const { req, res, next } = createMocks({
      req: {
        headers: { origin: allowedOrigin },
      },
    })

    cors()(req, res, next)

    expect(res.header).toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      allowedOrigin
    )
    expect(res.header).toHaveBeenCalledWith(
      "Access-Control-Allow-Credentials",
      "true"
    )
    expect(res.header).toHaveBeenCalledWith(
      "Access-Control-Allow-Headers",
      expect.any(String)
    )
    expect(res.header).toHaveBeenCalledWith(
      "Access-Control-Allow-Methods",
      expect.any(String)
    )
    expect(res.header).toHaveBeenCalledWith("Access-Control-Max-Age", "86400")
    expect(next).toHaveBeenCalled()
  })

  it("does not set allow-origin headers for disallowed origin", () => {
    const { req, res, next } = createMocks({
      req: {
        headers: { origin: disallowedOrigin },
      },
    })

    cors()(req, res, next)

    expect(res.header).not.toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      disallowedOrigin
    )
    expect(res.header).not.toHaveBeenCalledWith(
      "Access-Control-Allow-Credentials",
      "true"
    )
    expect(next).toHaveBeenCalled()
  })

  it("uses request headers for Access-Control-Allow-Headers and Methods", () => {
    const { req, res, next } = createMocks({
      req: {
        headers: {
          origin: allowedOrigin,
          "access-control-request-headers": "X-Custom-Header",
          "access-control-request-method": "PUT",
        },
        method: "GET",
      },
    })

    cors()(req, res, next)

    expect(res.header).toHaveBeenCalledWith(
      "Access-Control-Allow-Headers",
      "X-Custom-Header"
    )
    expect(res.header).toHaveBeenCalledWith(
      "Access-Control-Allow-Methods",
      "PUT"
    )
    expect(next).toHaveBeenCalled()
  })

  it("responds 200 and ends on OPTIONS preflight", () => {
    const { req, res, next } = createMocks({
      req: {
        headers: { origin: allowedOrigin },
        method: "OPTIONS",
      },
    })

    cors()(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.end).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })
})
