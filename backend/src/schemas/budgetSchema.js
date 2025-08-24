/** @file Budget schema. */
import { datetimeType } from "#config/db.js"
import BudgetService from "#services/BudgetService.js"

export default {
  name: "Budget",
  tableName: "budgets",

  skipActiveFilter: true,
  defaultRelations: ["items"],

  customService: BudgetService,

  routes: [
    { path: "/", method: "get", handler: "getById" },
    { path: "/:id", method: "get", handler: "getById" },
    { path: "/", method: "post", handler: "create" },
  ],

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
      eager: true,
    },
  },
}
