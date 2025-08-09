/** @file Main documents server. */
import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import cors from "./middlewares/cors.js"
import parseJson from "./middlewares/parseJson.js"
import { API_PREFIX } from "#config/config.js"
import projectRoutes from "#routes/projectRoutes.js"
import statusRoutes from "#routes/statusRoutes.js"
import templateRoutes from "#routes/templateRoutes.js"

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Add CORS headers
app.use(cors())

// Parse body as JSON
app.use(parseJson())

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "../public")))

// Status route
app.use(`${API_PREFIX}/status`, statusRoutes)

// Project routes
app.use(`${API_PREFIX}/projects`, projectRoutes)

// Template routes
app.use(`${API_PREFIX}/templates`, templateRoutes)

export default app
