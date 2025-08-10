/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class Init1754792424465 {
  name = "Init1754792424465"

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "budgets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "updatedOn" datetime DEFAULT (datetime('now')))`
    )
    await queryRunner.query(
      `CREATE TABLE "budgetItems" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar CHECK( "type" IN ('income','loanPayment','ccPayment','bill','variableExpense','shopping','takeout','entertainment','savings','investments') ) NOT NULL, "amount" decimal(18,2), "frequency" varchar CHECK( "frequency" IN ('payPeriod','monthly','semiannually','yearly') ) NOT NULL, "scheduled" boolean, "budgetId" integer)`
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_budgetItems" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar CHECK( "type" IN ('income','loanPayment','ccPayment','bill','variableExpense','shopping','takeout','entertainment','savings','investments') ) NOT NULL, "amount" decimal(18,2), "frequency" varchar CHECK( "frequency" IN ('payPeriod','monthly','semiannually','yearly') ) NOT NULL, "scheduled" boolean, "budgetId" integer, CONSTRAINT "FK_6e324f5cad509df2602b04f2ed3" FOREIGN KEY ("budgetId") REFERENCES "budgets" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_budgetItems"("id", "name", "type", "amount", "frequency", "scheduled", "budgetId") SELECT "id", "name", "type", "amount", "frequency", "scheduled", "budgetId" FROM "budgetItems"`
    )
    await queryRunner.query(`DROP TABLE "budgetItems"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_budgetItems" RENAME TO "budgetItems"`
    )
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "budgetItems" RENAME TO "temporary_budgetItems"`
    )
    await queryRunner.query(
      `CREATE TABLE "budgetItems" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar CHECK( "type" IN ('income','loanPayment','ccPayment','bill','variableExpense','shopping','takeout','entertainment','savings','investments') ) NOT NULL, "amount" decimal(18,2), "frequency" varchar CHECK( "frequency" IN ('payPeriod','monthly','semiannually','yearly') ) NOT NULL, "scheduled" boolean, "budgetId" integer)`
    )
    await queryRunner.query(
      `INSERT INTO "budgetItems"("id", "name", "type", "amount", "frequency", "scheduled", "budgetId") SELECT "id", "name", "type", "amount", "frequency", "scheduled", "budgetId" FROM "temporary_budgetItems"`
    )
    await queryRunner.query(`DROP TABLE "temporary_budgetItems"`)
    await queryRunner.query(`DROP TABLE "budgetItems"`)
    await queryRunner.query(`DROP TABLE "budgets"`)
  }
}
