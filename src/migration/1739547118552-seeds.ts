import { MigrationInterface, QueryRunner } from 'typeorm';
import { env } from '../main/config/env';

export class Seeds1739547118552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO currency (code, "name", symbol) VALUES 
      ('USD', 'US dollar', '$'), 
      ('BRL', 'Real brasileiro', 'R$'), 
      ('MXN', 'Pesos Mexicanos', '$');`
    );

    await queryRunner.query(
      `INSERT INTO plan ("name", minimum_of_restaurant, minimum_of_product) VALUES 
      ('Basic', 1, 20),
      ('Pro', 3, 50),
      ('Enterprise', 8, 150),
      ('Premium', 0, 0);`
    );

    await queryRunner.query(
      `INSERT INTO plan_price (monthly_price, price_of_restaurant, price_of_product, discount, "period", currency_id, plan_id) VALUES 
      (99.98,   89.99,  1.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Basic')),
      (99.98,   89.99,  1.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Basic')),
      (159.98,  69.99,  0.99,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Pro')),
      (159.98,  69.99,  0.99,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Pro')),
      (219.98,  55.99,  0.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Enterprise')),
      (219.98,  55.99,  0.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Enterprise')),

      (168.98,  119.99, 2.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Basic')),
      (168.98,  119.99, 2.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Basic')),
      (239.98,  99.99,  1.89,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Pro')),
      (239.98,  99.99,  1.89,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Pro')),
      (339.98,  79.99,  1.09,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Enterprise')),
      (339.98,  79.99,  1.09,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Enterprise')),

      (819.98,  719.99, 14.49, 0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'MXN'), (SELECT id FROM plan WHERE name = 'Basic')),
      (819.98,  719.99, 14.49, 16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'MXN'), (SELECT id FROM plan WHERE name = 'Basic')),
      (1099.98, 79.99,  10.99, 0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'MXN'), (SELECT id FROM plan WHERE name = 'Pro')),
      (1099.98, 79.99,  10.99, 16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'MXN'), (SELECT id FROM plan WHERE name = 'Pro')),
      (1399.98, 79.99,  5.98,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'MXN'), (SELECT id FROM plan WHERE name = 'Enterprise')),
      (1399.98, 79.99,  5.98,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'MXN'), (SELECT id FROM plan WHERE name = 'Enterprise'))`
    );

    await queryRunner.query(
      `INSERT INTO "subscription" (price, restaurant_limit, product_limit, expires_at, plan_id) VALUES 
      (0, 999999, 999999, NOW(), (SELECT id FROM plan WHERE name = 'Premium'));`
    );

    await queryRunner.query(
      `INSERT INTO company ("name", company_url, currency_id, subscription_id) VALUES 
      ('Menu Eazy', 'menu-eazy',
      (SELECT id FROM currency WHERE code = 'USD'), 
      (SELECT id FROM "subscription" WHERE 
      price = 0 
      AND restaurant_limit = 999999 
      AND product_limit = 999999  
      AND plan_id = (SELECT id FROM plan WHERE name = 'Premium')));`
    );

    await queryRunner.query(
      `INSERT INTO "user" ("name", email, firebase_id, phone, role, company_id) VALUES 
      ('Menu Eazy', ${env.ADMIN.email}, ${env.ADMIN.firebaseId}, ${env.ADMIN.phone}, 'ADMIN', (SELECT id FROM company WHERE company_url = 'menu-eazy'));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user WHERE email = ${env.ADMIN.email};`);

    await queryRunner.query(`DELETE FROM company WHERE company_url = 'menu-eazy';`);

    await queryRunner.query(`DELETE FROM "subscription" WHERE price = 0;`);

    await queryRunner.query(
      `DELETE FROM plan_price WHERE plan_id IN (SELECT id FROM plan WHERE name IN ('Basic', 'Pro', 'Enterprise', 'Premium'));`
    );

    await queryRunner.query(
      `DELETE FROM plan WHERE name IN ('Basic', 'Pro', 'Enterprise', 'Premium');`
    );

    await queryRunner.query(`DELETE FROM currency WHERE code IN ('USD', 'BRL', 'MXN');`);
  }
}
