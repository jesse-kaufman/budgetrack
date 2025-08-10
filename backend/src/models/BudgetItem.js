/** @file Project cost item model. */
import { EntitySchema } from "typeorm"
import { itemTypes, frequencies } from "shared/budget"
import { getBooleanType } from "#utils/dbUtils.js"

console.log(frequencies.getKeys())

export default new EntitySchema({
  name: "BudgetItem",
  tableName: "budgetItems",
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
      type: getBooleanType(),
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
})
