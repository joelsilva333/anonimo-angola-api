import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1756291835232 implements MigrationInterface {
    name = 'NewMigration1756291835232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updated_at"`);
    }

}
