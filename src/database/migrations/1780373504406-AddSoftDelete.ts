import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDelete1780373504406 implements MigrationInterface {
    name = 'AddSoftDelete1780373504406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "member" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
    }

}
