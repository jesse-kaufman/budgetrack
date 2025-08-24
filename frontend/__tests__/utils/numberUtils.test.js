/** @file Unit tests for number utilities. */

import { describe, expect, it } from "vitest"
import { formatNumber } from "#utils/numberUtils.js"

describe("numberUtils", () => {
  describe("formatNumber()", () => {
    it("should format a number with the correct number of decimal points", () => {
      // Test formatting 123 with decimals = 2; should return 123.00
      const formattedValue = formatNumber(123, 2)
      expect(formattedValue).toBe("123.00")

      // Test formatting 123.123 with decimals = 2; should return 123.12
      const formattedValue1 = formatNumber(123.123, 2)
      expect(formattedValue1).toBe("123.12")
    })

    it("should return the value unchanged if decimals is null", () => {
      expect(formatNumber(123)).toBe(123)
      expect(formatNumber("")).toBe("")
      expect(formatNumber(null)).toBeNull()
      expect(formatNumber("invalid")).toBe("invalid")
      expect(formatNumber(undefined)).toBe(undefined)
    })
  })
})
