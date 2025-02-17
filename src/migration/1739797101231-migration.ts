import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1739797101231 implements MigrationInterface {
  name = 'Migration1739797101231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_2c87b1d142d4d2c5a22e386daef"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_991556e9aecf0dc959291794b13"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_a0503db1630a5b8a4d7deabd556"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" RENAME COLUMN "product_restaurant_id" TO "product_id"`
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "company_id"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "company_id"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "price" numeric(10,2) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "out_of_stock" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "start_sell_at" TIMESTAMP WITH TIME ZONE NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "finish_sell_at" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(`ALTER TABLE "product" ADD "discount" numeric(10,2)`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "start_discount_at" TIMESTAMP WITH TIME ZONE`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "finish_discount_at" TIMESTAMP WITH TIME ZONE`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "only_in_restaurant" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "value_by_km_in_delivery" numeric(10,2)`);
    await queryRunner.query(`ALTER TABLE "product" ADD "restaurant_id" integer`);
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_26b533e15b5f2334c96339a1f08"`
    );
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "restaurant_id"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "value_by_km_in_delivery"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "only_in_restaurant"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "finish_discount_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "start_discount_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "discount"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "finish_sell_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "start_sell_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "out_of_stock"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "company_id" integer`);
    await queryRunner.query(`ALTER TABLE "category" ADD "company_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "review" RENAME COLUMN "product_id" TO "product_restaurant_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_a0503db1630a5b8a4d7deabd556" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_991556e9aecf0dc959291794b13" FOREIGN KEY ("product_restaurant_id") REFERENCES "product_restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_2c87b1d142d4d2c5a22e386daef" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
