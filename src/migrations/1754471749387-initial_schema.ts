import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1754471749387 implements MigrationInterface {
    name = 'InitialSchema1754471749387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "umail" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "umail"`);
    }

}
