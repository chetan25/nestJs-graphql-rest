const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1649623221829 {
    name = 'initialSchema1649623221829'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "note" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_note" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_note"("id", "title", "description", "completed", "userId") SELECT "id", "title", "description", "completed", "userId" FROM "note"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`ALTER TABLE "temporary_note" RENAME TO "note"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "note" RENAME TO "temporary_note"`);
        await queryRunner.query(`CREATE TABLE "note" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "note"("id", "title", "description", "completed", "userId") SELECT "id", "title", "description", "completed", "userId" FROM "temporary_note"`);
        await queryRunner.query(`DROP TABLE "temporary_note"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
