import { MigrationInterface, QueryRunner } from "typeorm";

export class CampaignStatusEnum1780373754605 implements MigrationInterface {
    name = 'CampaignStatusEnum1780373754605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."campaign_status_enum" AS ENUM('draft', 'published', 'ongoing', 'completed', 'archived')`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "status" "public"."campaign_status_enum" NOT NULL DEFAULT 'draft'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."campaign_status_enum"`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "status" character varying NOT NULL DEFAULT 'draft'`);
    }

}
