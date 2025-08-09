/** @file Project model. */
import { EntitySchema } from "typeorm"
import dbConfig from "#config/db.js"
import { getBooleanType, getDatetimeType } from "#utils/dbUtils.js"

const boolType = getBooleanType(dbConfig.type)
const datetimeType = getDatetimeType(dbConfig.type)

export default new EntitySchema({
  name: "Project",
  tableName: "projects",
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
    loanNum: {
      type: "int",
    },
    lot: {
      type: "varchar",
      nullable: true,
    },
    block: {
      type: "varchar",
      nullable: true,
    },
    addition: {
      type: "varchar",
      nullable: true,
    },
    city: {
      type: "varchar",
      nullable: true,
    },
    state: {
      type: "varchar",
      nullable: true,
    },
    zip: {
      type: "varchar",
      nullable: true,
    },
    projectedCost: {
      type: "decimal",
      precision: 18,
      scale: 2,
      default: 0,
    },
    actualCost: {
      type: "decimal",
      precision: 18,
      scale: 2,
      default: 0,
    },
    drawnAmount: {
      type: "decimal",
      precision: 18,
      scale: 2,
      default: 0,
    },
    createdOn: {
      type: datetimeType,
      createDate: true,
    },
    updatedOn: {
      type: datetimeType,
      updateDate: true,
      nullable: true,
    },
  },
  relations: {
    costs: {
      type: "one-to-many",
      target: "ProjectCostItem",
      inverseSide: "project",
      cascade: true,
      orphanedRowAction: "delete",
    },
  },
})
