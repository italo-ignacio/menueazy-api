import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741278667774 implements MigrationInterface {
  name = 'Migration1741278667774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b"`
    );
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "open" SET DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "style_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b"`
    );
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "style_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "open" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
  }
}
