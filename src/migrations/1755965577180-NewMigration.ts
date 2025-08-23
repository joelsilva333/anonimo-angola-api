import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1755965577180 implements MigrationInterface {
    name = 'NewMigration1755965577180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "fuck" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fuck"`);
    }

}
