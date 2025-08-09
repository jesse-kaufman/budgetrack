/** @file Unit tests for StatusController. */
import { describe, expect, it, vi } from "vitest"
import StatusController from "#controllers/StatusController.js"

describe("StatusController", () => {
  it("status responds with correct message", () => {
    const controller = new StatusController()
    const res = {
      json: vi.fn(),
    }
    controller.status({}, res)
    expect(res.json).toHaveBeenCalledWith({ message: "The API is up!" })
  })
})
