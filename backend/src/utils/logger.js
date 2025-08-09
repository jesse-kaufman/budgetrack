/** @file Logger utility function. */
import pino from "pino"

const devTransport = {
  target: "pino-pretty",
  options: { colorize: true },
}

export default pino({
  transport: process.env.NODE_ENV === "development" ? devTransport : undefined,
})
