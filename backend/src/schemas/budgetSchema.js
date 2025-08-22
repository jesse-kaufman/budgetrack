/** @file Budget schema. */
import dbConfig from "#config/db.js"

export default {
  name: "Budget",
  tableName: "budgets",

  pluralName: "Budgets",
  skipActiveFilter: true,
  defaultRelations: ["items"],

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    updatedOn: {
      type: dbConfig.datetimeType,
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
