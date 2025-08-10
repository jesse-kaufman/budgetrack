/** @file Unit tests for serverUtils.js. */
import chalk from "chalk"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import logger from "#utils/logger.js"
import * as serverUtils from "#utils/serverUtils.js"

describe("logStartup", () => {
  let infoSpy = null

  beforeEach(() => {
    infoSpy = vi.spyOn(logger, "info").mockImplementation(() => {
      // No-op
    })
    vi.useFakeTimers("modern").setSystemTime(
      new Date("2025-08-08T15:00:00Z").getTime()
    )
  })

  afterEach(() => {
    infoSpy.mockRestore()
    vi.useRealTimers()
  })

  it("logs server startup info with production env", () => {
    serverUtils.logStartup({ port: 3000, env: "production" })

    const charWidth = 60
    const repeatedDash = "-".repeat(charWidth)
    const expectedEnv = chalk.green.bold("Production")
    const expectedStartTime = new Date().toLocaleString("en-US")

    expect(infoSpy).toHaveBeenCalledWith(repeatedDash)
    expect(infoSpy).toHaveBeenCalledWith(`Server started: ${expectedStartTime}`)
    expect(infoSpy).toHaveBeenCalledWith(repeatedDash)
    expect(infoSpy).toHaveBeenCalledWith(
      chalk.green(`🟢${expectedEnv} server listening on port 3000.`)
    )
  })

  it("logs server startup info with non-production env", () => {
    serverUtils.logStartup({ port: 8080, env: "development" })

    const charWidth = 60
    const repeatedDash = "-".repeat(charWidth)
    const expectedEnv = chalk.yellow("Development")
    const expectedStartTime = new Date().toLocaleString("en-US")

    expect(infoSpy).toHaveBeenCalledWith(repeatedDash)
    expect(infoSpy).toHaveBeenCalledWith(`Server started: ${expectedStartTime}`)
    expect(infoSpy).toHaveBeenCalledWith(repeatedDash)
    expect(infoSpy).toHaveBeenCalledWith(
      chalk.green(`🟢${expectedEnv} server listening on port 8080.`)
    )
  })
})
