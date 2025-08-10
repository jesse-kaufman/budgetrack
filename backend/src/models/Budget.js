/** @file Project model. */
import { EntitySchema } from "typeorm"
import dbConfig from "#config/db.js"
import { getDatetimeType } from "#utils/dbUtils.js"

const datetimeType = getDatetimeType(dbConfig.type)

export default new EntitySchema({
  name: "Budget",
  tableName: "budgets",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    updatedOn: {
      type: datetimeType,
      updateDate: true,
      nullable: true,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    items: {
      type: "one-to-many",
      target: "BudgetItem",
      inverseSide: "budget",
      orphanedRowAction: "delete",
      cascade: true,
    },
  },
})
