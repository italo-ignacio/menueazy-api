import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741797781466 implements MigrationInterface {
  name = 'Migration1741797781466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ADD "order" integer NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_48be827a112f05347b53cbc330b"`
    );
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "restaurant_id" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_48be827a112f05347b53cbc330b" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_48be827a112f05347b53cbc330b"`
    );
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "restaurant_id" SET DEFAULT '1'`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_48be827a112f05347b53cbc330b" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "order"`);
  }
}
