/** @file Hello routes. */
import { Router } from "express"
import StatusController from "#controllers/StatusController.js"

const statusRoutes = new Router()
const controller = new StatusController()

statusRoutes.use("/", controller.status)

export default statusRoutes
