import { MigrationInterface, QueryRunner } from 'typeorm';

export class Extension1741632772758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }
}
