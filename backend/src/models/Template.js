/** @file Template model. */
import { EntitySchema } from "typeorm"
import dbConfig from "#config/db.js"
import { getBooleanType } from "#utils/dbUtils.js"

const boolType = getBooleanType(dbConfig.type)

export default new EntitySchema({
  name: "Template",
  tableName: "projectTemplates",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    isActive: {
      type: boolType,
      default: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    costs: {
      type: "one-to-many",
      target: "TemplateItem",
      inverseSide: "template",
      cascade: true,
      eager: true,
      orphanedRowAction: "delete",
    },
  },
})
