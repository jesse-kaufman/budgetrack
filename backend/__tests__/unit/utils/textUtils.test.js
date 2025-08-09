/** @file Unit tests for textUtils.js. */
import { describe, expect, it } from "vitest"
import { toUpperFirst } from "#utils/textUtils.js"

describe("toUpperFirst", () => {
  it("capitalizes the first letter of a lowercase string", () => {
    expect(toUpperFirst("hello")).toBe("Hello")
  })

  it("returns same string if first letter is already uppercase", () => {
    expect(toUpperFirst("World")).toBe("World")
  })

  it("returns empty string if input is empty", () => {
    expect(toUpperFirst("")).toBe("")
  })

  it("capitalizes only the first character", () => {
    expect(toUpperFirst("hELLO")).toBe("HELLO")
  })

  it("works with single character strings", () => {
    expect(toUpperFirst("a")).toBe("A")
  })
})
