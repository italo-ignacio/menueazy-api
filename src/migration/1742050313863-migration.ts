import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742050313863 implements MigrationInterface {
    name = 'Migration1742050313863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_person" DROP CONSTRAINT "FK_cc22fad05bb09b8231dc57cfc6a"`);
        await queryRunner.query(`DROP INDEX "public"."delivery_person_name_company_id_key"`);
        await queryRunner.query(`ALTER TABLE "delivery_person" RENAME COLUMN "company_id" TO "restaurant_id"`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`CREATE UNIQUE INDEX "delivery_person_name_restaurant_id_key" ON "delivery_person" ("name", "restaurant_id") `);
        await queryRunner.query(`ALTER TABLE "delivery_person" ADD CONSTRAINT "FK_5e799c002c79aa381eeeb0c1a6f" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_person" DROP CONSTRAINT "FK_5e799c002c79aa381eeeb0c1a6f"`);
        await queryRunner.query(`DROP INDEX "public"."delivery_person_name_restaurant_id_key"`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "delivery_person" RENAME COLUMN "restaurant_id" TO "company_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "delivery_person_name_company_id_key" ON "delivery_person" ("name", "company_id") `);
        await queryRunner.query(`ALTER TABLE "delivery_person" ADD CONSTRAINT "FK_cc22fad05bb09b8231dc57cfc6a" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
