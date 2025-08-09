/** @file Template item model. */
import { EntitySchema } from "typeorm"

export default new EntitySchema({
  name: "TemplateItem",
  tableName: "projectTemplateItems",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    order: {
      type: "int",
    },
    name: {
      type: "varchar",
    },
    percent: {
      type: "int",
    },
  },
  relations: {
    template: {
      type: "many-to-one",
      target: "Template",
      joinColumn: true,
      inverseSide: "costs",
    },
  },
})
