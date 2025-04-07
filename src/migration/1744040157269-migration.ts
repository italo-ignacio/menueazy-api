import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744040157269 implements MigrationInterface {
    name = 'Migration1744040157269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."ingredient_name_restaurant"`);
        await queryRunner.query(`ALTER TABLE "ingredient_data" ADD "total_price" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient_data" ADD "price_in_stock" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "quantity" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "total_price" real NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "price_in_stock" real NOT NULL DEFAULT '0'`);
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
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "price_in_stock"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "ingredient_data" DROP COLUMN "price_in_stock"`);
        await queryRunner.query(`ALTER TABLE "ingredient_data" DROP COLUMN "total_price"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ingredient_name_restaurant" ON "ingredient" ("name", "restaurant_id") `);
    }

}
