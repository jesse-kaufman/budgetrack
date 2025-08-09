/** @file Template routes. */
import { Router } from "express"
import TemplateController from "#controllers/TemplateController.js"

const controller = new TemplateController()
const templateRoutes = new Router()

templateRoutes
  .get("/", controller.getAll)
  .get("/:id", controller.getById)
  .post("/", controller.create)
  .put("/:id", controller.update)
  .delete("/:id", controller.delete)

export default templateRoutes
