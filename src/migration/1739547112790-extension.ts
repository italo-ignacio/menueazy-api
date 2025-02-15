import { MigrationInterface, QueryRunner } from 'typeorm';

export class Extension1739547112790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }
}
