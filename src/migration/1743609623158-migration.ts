import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743609623158 implements MigrationInterface {
    name = 'Migration1743609623158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "rate_numeric"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "rate_numeric" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "in_stock" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`DROP INDEX "public"."order_status_type_idx"`);
        await queryRunner.query(`ALTER TYPE "public"."order_type_enum" RENAME TO "order_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_type_enum" AS ENUM('RESTAURANT', 'DELIVERY', 'PICKUP')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "type" TYPE "public"."order_type_enum" USING "type"::"text"::"public"."order_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_type_enum_old"`);
        await queryRunner.query(`CREATE INDEX "order_status_type_idx" ON "order" ("status", "type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."order_status_type_idx"`);
        await queryRunner.query(`CREATE TYPE "public"."order_type_enum_old" AS ENUM('RESTAURANT', 'DELIVERY')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "type" TYPE "public"."order_type_enum_old" USING "type"::"text"::"public"."order_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."order_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_type_enum_old" RENAME TO "order_type_enum"`);
        await queryRunner.query(`CREATE INDEX "order_status_type_idx" ON "order" ("status", "type") `);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "in_stock" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "rate_numeric"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "rate_numeric" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
    }

}
