/** @file API Status routes. */
import { Router } from "express"

/** @type {Router} Routers for status endpoint. */
const statusRoutes = new Router()

// Add endpoint for API status
statusRoutes.get("/", (req, res) => res.json({ message: "The API is up!" }))

export default statusRoutes
