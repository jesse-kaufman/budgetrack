/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class Migration1754835653304 {
    name = 'Migration1754835653304'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_budgets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "updatedOn" datetime DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_budgets"("id", "updatedOn") SELECT "id", "updatedOn" FROM "budgets"`);
        await queryRunner.query(`DROP TABLE "budgets"`);
        await queryRunner.query(`ALTER TABLE "temporary_budgets" RENAME TO "budgets"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "budgets" RENAME TO "temporary_budgets"`);
        await queryRunner.query(`CREATE TABLE "budgets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "updatedOn" datetime DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "budgets"("id", "updatedOn") SELECT "id", "updatedOn" FROM "temporary_budgets"`);
        await queryRunner.query(`DROP TABLE "temporary_budgets"`);
    }
}
