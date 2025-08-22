/** @file Budget item schema. */
import { itemTypes, frequencies } from "shared/budget"
import dbConfig from "#config/db.js"

export default {
  name: "BudgetItem",
  tableName: "budgetItems",

  registerRepository: false,
  registerService: false,

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    type: {
      type: "varchar",
      enum: itemTypes.getKeys(),
    },
    amount: {
      type: "decimal",
      precision: 18,
      scale: 2,
    },
    frequency: {
      type: "varchar",
      enum: frequencies.getKeys(),
    },
    scheduled: {
      type: dbConfig.booleanType,
      default: false,
    },
  },
  relations: {
    budget: {
      type: "many-to-one",
      target: "Budget",
      joinColumn: true,
      inverseSide: "items",
    },
  },
}
