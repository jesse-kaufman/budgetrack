/** @file Budget item schema. */
import { frequencies, itemTypes } from "shared/budget"
import { booleanType } from "#config/db.js"

export default {
  name: "BudgetItem",
  tableName: "budgetItems",

  registerRepository: false, // Do not register repository for schema
  registerService: false, // Do not register service for schema
  registerRoutes: false, // Do not register routes for schema

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
      type: booleanType,
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
