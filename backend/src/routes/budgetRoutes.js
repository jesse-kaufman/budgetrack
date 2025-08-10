/** @file Project routes. */
import { Router } from "express"
import BudgetController from "#controllers/BudgetController.js"

const controller = new BudgetController()
const projectRoutes = new Router()

projectRoutes
  .get("/", controller.getAll)
  .get("/:id", controller.getById)
  .post("/", controller.create)
  .put("/:id", controller.update)
  .delete("/:id", controller.delete)

export default projectRoutes
