import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744307155636 implements MigrationInterface {
    name = 'Migration1744307155636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "final_price" real NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product_option_item" DROP CONSTRAINT "FK_ed920514abb31117eb5d93e492a"`);
        await queryRunner.query(`ALTER TABLE "product_option_item" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`CREATE UNIQUE INDEX "opening_hour_day_of_week_restaurant_unique" ON "opening_hour" ("day_of_week", "restaurant_id") `);
        await queryRunner.query(`ALTER TABLE "product_option_item" ADD CONSTRAINT "FK_ed920514abb31117eb5d93e492a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_option_item" DROP CONSTRAINT "FK_ed920514abb31117eb5d93e492a"`);
        await queryRunner.query(`DROP INDEX "public"."opening_hour_day_of_week_restaurant_unique"`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product_option_item" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_option_item" ADD CONSTRAINT "FK_ed920514abb31117eb5d93e492a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "final_price"`);
    }

}
