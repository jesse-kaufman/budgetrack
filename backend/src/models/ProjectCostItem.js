/** @file Project cost item model. */
import { EntitySchema } from "typeorm"

export default new EntitySchema({
  name: "ProjectCostItem",
  tableName: "projectCostItems",
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
    percentOfProjectedTotal: {
      type: "int",
    },
    actualCost: {
      type: "decimal",
      precision: 18,
      scale: 2,
      nullable: true,
    },
    drawnAmount: {
      type: "decimal",
      precision: 18,
      scale: 2,
      nullable: true,
    },
    inspectedOn: {
      type: "datetime",
      nullable: true,
    },
    drawRequestedOn: {
      type: "datetime",
      nullable: true,
    },
  },
  relations: {
    project: {
      type: "many-to-one",
      target: "Project",
      joinColumn: true,
      inverseSide: "costs",
    },
  },
})
