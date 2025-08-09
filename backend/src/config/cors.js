/** @file CORS configuration. */

export default {
  allowedOrigins: (process.env.allowedOrigins || "*")
    .split(",")
    .map((o) => o.trim()),
  maxAge: process.env.maxAge || 86400,
}
