/** @file Project routes. */
import { Router } from "express"
import BudgetController from "#controllers/BudgetController.js"

const controller = new BudgetController()
const projectRoutes = new Router()

projectRoutes.get("/", controller.getAll).put("/", controller.update)

export default projectRoutes
