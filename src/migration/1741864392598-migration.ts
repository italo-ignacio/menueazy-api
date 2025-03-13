import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741864392598 implements MigrationInterface {
  name = 'Migration1741864392598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_option_item" DROP CONSTRAINT "FK_ed920514abb31117eb5d93e492a"`
    );
    await queryRunner.query(`ALTER TABLE "product_option_item" ADD "additional_price" real`);
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" ADD CONSTRAINT "FK_ed920514abb31117eb5d93e492a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_option_item" DROP CONSTRAINT "FK_ed920514abb31117eb5d93e492a"`
    );
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "product_option_item" DROP COLUMN "additional_price"`);
    await queryRunner.query(
      `ALTER TABLE "product_option_item" ADD CONSTRAINT "FK_ed920514abb31117eb5d93e492a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
