/** @file Main documents server. */
import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import { API_PREFIX } from "#config/config.js"
import controllers from "#registries/controller.js"
import schemas from "#registries/schema.js"
import statusRoutes from "#routes/statusRoutes.js"
import registerSchemaRoutes from "#utils/routeUtils.js"
import cors from "./middlewares/cors.js"
import parseJson from "./middlewares/parseJson.js"

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Add CORS headers
app.use(cors())

// Parse body as JSON
app.use(parseJson())

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "../public")))

app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"))
})

// Status route
app.use(`${API_PREFIX}/status`, statusRoutes)

// Register all schema routes
registerSchemaRoutes(app, schemas, controllers)

export default app
