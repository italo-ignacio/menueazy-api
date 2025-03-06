import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741276002449 implements MigrationInterface {
  name = 'Migration1741276002449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_4e1698719a458d900ded8ca4dbd"`);
    await queryRunner.query(
      `CREATE TABLE "delivery_person" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "phone" character varying(25), "company_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_291d7a7ca36c0b1b360f643cd15" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "delivery_person_name_company_id_key" ON "delivery_person" ("name", "company_id") `
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "address_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "restaurant" ADD "address_id" integer`);
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'OWNER', 'MANAGER', 'SUPERVISOR', 'EMPLOYEE')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_person" ADD CONSTRAINT "FK_cc22fad05bb09b8231dc57cfc6a" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_4e1698719a458d900ded8ca4dbd" FOREIGN KEY ("delivery_person_id") REFERENCES "delivery_person"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_f07603e96b068aae820d4590270" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_109960073e718523582b9440353" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_109960073e718523582b9440353"`
    );
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f07603e96b068aae820d4590270"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_4e1698719a458d900ded8ca4dbd"`);
    await queryRunner.query(
      `ALTER TABLE "delivery_person" DROP CONSTRAINT "FK_cc22fad05bb09b8231dc57cfc6a"`
    );
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "table" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum_old" AS ENUM('ADMIN', 'MANAGER', 'OWNER', 'EMPLOYEE', 'DELIVERY_PERSON')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "address_id"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "address_id"`);
    await queryRunner.query(`DROP INDEX "public"."delivery_person_name_company_id_key"`);
    await queryRunner.query(`DROP TABLE "delivery_person"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_4e1698719a458d900ded8ca4dbd" FOREIGN KEY ("delivery_person_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
  }
}
