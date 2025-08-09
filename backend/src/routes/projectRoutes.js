/** @file Project routes. */
import { Router } from "express"
import ProjectController from "#controllers/ProjectController.js"

const controller = new ProjectController()
const projectRoutes = new Router()

projectRoutes
  .get("/", controller.getAll)
  .get("/:id", controller.getById)
  .post("/", controller.create)
  .put("/:id", controller.update)
  .delete("/:id", controller.delete)

export default projectRoutes
