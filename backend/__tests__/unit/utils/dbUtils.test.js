/** @file Unit tests for dbUtils.js. */
import { describe, expect, it } from "vitest"
import { getBooleanType, getDatetimeType } from "#utils/dbUtils.js"

describe("getBooleanType", () => {
  it("returns 'bit' for mssql", () => {
    expect(getBooleanType("mssql")).toBe("bit")
  })

  it("returns 'boolean' for other DB types", () => {
    expect(getBooleanType("sqlite")).toBe("boolean")
    expect(getBooleanType("postgres")).toBe("boolean")
    expect(getBooleanType("")).toBe("boolean")
    expect(getBooleanType(undefined)).toBe("boolean")
  })
})

describe("getDatetimeType", () => {
  it("returns 'datetime2' for mssql", () => {
    expect(getDatetimeType("mssql")).toBe("datetime2")
  })

  it("returns 'datetime' for other DB types", () => {
    expect(getDatetimeType("sqlite")).toBe("datetime")
    expect(getDatetimeType("postgres")).toBe("datetime")
    expect(getDatetimeType("")).toBe("datetime")
    expect(getDatetimeType(undefined)).toBe("datetime")
  })
})
