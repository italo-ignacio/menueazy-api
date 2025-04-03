import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743686669429 implements MigrationInterface {
    name = 'Migration1743686669429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "totalOrder" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "totalRate" real NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "avgRate" real`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "avgRate"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "totalRate"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "totalOrder"`);
    }

}
