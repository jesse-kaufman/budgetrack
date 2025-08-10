/** @file Project cost item model. */
import { EntitySchema } from "typeorm"
import { itemTypes, frequencies } from "shared/budget"
import { getBooleanType } from "#utils/dbUtils.js"

console.log(frequencies.getKeys())

export default new EntitySchema({
  name: "BudgetItems",
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
      nullable: true,
    },
    frequency: {
      type: "varchar",
      enum: frequencies.getKeys(),
    },
    scheduled: {
      type: getBooleanType(),
      nullable: true,
    },
  },
  relations: {
    budget: {
      type: "many-to-one",
      target: "Budget",
      joinColumn: true,
      inverseSide: "costs",
    },
  },
})
