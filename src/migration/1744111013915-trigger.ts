import { MigrationInterface, QueryRunner } from 'typeorm';

export class Trigger1744111013915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_product_total_order()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'INSERT' AND NEW.status = 'FINISHED' THEN
          UPDATE product
          SET total_order = COALESCE(total_order, 0) + NEW.quantity
          WHERE id = NEW.product_id;

        ELSIF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status AND NEW.status = 'FINISHED' THEN
          UPDATE product
          SET total_order = COALESCE(total_order, 0) + NEW.quantity
          WHERE id = NEW.product_id;

        ELSIF TG_OP = 'UPDATE' AND OLD.status = 'FINISHED' AND NEW.status IS DISTINCT FROM OLD.status THEN
          UPDATE product
          SET total_order = COALESCE(total_order, 0) - OLD.quantity
          WHERE id = OLD.product_id;

        ELSIF TG_OP = 'UPDATE' AND NEW.status = 'FINISHED' AND OLD.quantity IS DISTINCT FROM NEW.quantity THEN
          UPDATE product
          SET total_order = COALESCE(total_order, 0) + (NEW.quantity - OLD.quantity)
          WHERE id = NEW.product_id;

        ELSIF TG_OP = 'UPDATE' AND OLD.finished_at IS NULL AND NEW.finished_at IS NOT NULL THEN
          UPDATE product
          SET total_order = COALESCE(total_order, 0) - OLD.quantity
          WHERE id = OLD.product_id;
        END IF;

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER trigger_update_total_order
      AFTER INSERT OR UPDATE ON order_product
      FOR EACH ROW
      EXECUTE FUNCTION update_product_total_order();
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_product_rating()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'INSERT' AND NEW.product_id IS NOT NULL THEN
          UPDATE product
          SET
            total_rate = (
              SELECT COALESCE(COUNT(id), 0)
              FROM review
              WHERE product_id = NEW.product_id AND finished_at IS NULL
            ),
            avg_rate = (
              SELECT COALESCE(AVG(rate_numeric), 0)
              FROM review
              WHERE product_id = NEW.product_id AND finished_at IS NULL
            )
          WHERE id = NEW.product_id;
   
        ELSIF TG_OP = 'UPDATE' AND NEW.rate_numeric IS DISTINCT FROM OLD.rate_numeric THEN
          UPDATE product
          SET
            avg_rate = (
              SELECT COALESCE(AVG(rate_numeric), 0)
              FROM review
              WHERE product_id = NEW.product_id AND finished_at IS NULL
            )
          WHERE id = NEW.product_id;

        ELSIF TG_OP = 'UPDATE' AND OLD.finished_at IS NULL AND NEW.finished_at IS NOT NULL THEN
          UPDATE product
          SET
            total_rate = (
              SELECT COALESCE(COUNT(id), 0)
              FROM review
              WHERE product_id = NEW.product_id AND finished_at IS NULL
            ),
            avg_rate = (
              SELECT COALESCE(AVG(rate_numeric), 0)
              FROM review
              WHERE product_id = NEW.product_id AND finished_at IS NULL
            )
          WHERE id = NEW.product_id;
        END IF;
  
        RETURN COALESCE(NEW, OLD);
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER trigger_update_product_rating
      AFTER INSERT OR UPDATE ON review
      FOR EACH ROW
      EXECUTE FUNCTION update_product_rating();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_update_total_order ON order_product;`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_product_total_order();`);

    await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_update_product_rating ON review;`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_product_rating();`);
  }
}
