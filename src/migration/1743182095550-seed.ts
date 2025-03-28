import { MigrationInterface, QueryRunner } from 'typeorm';
import { env } from '../main/config/env';

export class Seed1743182095550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO currency (code, "name", symbol) VALUES 
      ('USD', 'US Dollar', '$'), 
      ('EUR', 'Euro', '€'),
      ('BRL', 'Real Brasileiro', 'R$');`
    );

    await queryRunner.query(
      `INSERT INTO plan ("name", minimum_of_restaurant, minimum_of_product) VALUES 
      ('Free', 1, 20),
      ('Basic', 1, 25),
      ('Pro', 3, 50),
      ('Enterprise', 6, 100),
      ('Premium', 0, 0);`
    );

    await queryRunner.query(
      `INSERT INTO plan_price (monthly_price, price_of_restaurant, price_of_product, discount, "period", currency_id, plan_id) VALUES 
      
      (0, 0, 0, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Free')),
      (99.98,  89.99,  1.49, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Basic')),
      (159.98, 69.99,  0.99, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Pro')),
      (219.98, 55.99,  0.49, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Enterprise')),
      
      (0, 0, 0, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Free')),
      (99.98,  89.99,  1.49, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Basic')),
      (159.98, 69.99,  0.99, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Pro')),
      (219.98, 55.99,  0.49, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Enterprise')),
      
      (0, 0, 0, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Free')),
      (168.98, 119.99, 2.49, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Basic')),
      (239.98, 99.99,  1.89, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Pro')),
      (339.98, 79.99,  1.09, 0, 'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Enterprise'));`
    );

    // await queryRunner.query(
    //   `INSERT INTO plan_price (monthly_price, price_of_restaurant, price_of_product, discount, "period", currency_id, plan_id) VALUES
    //   (99.98,   89.99,  1.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Basic')),
    //   (99.98,   89.99,  1.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Basic')),
    //   (159.98,  69.99,  0.99,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Pro')),
    //   (159.98,  69.99,  0.99,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Pro')),
    //   (219.98,  55.99,  0.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Enterprise')),
    //   (219.98,  55.99,  0.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'USD'), (SELECT id FROM plan WHERE name = 'Enterprise')),

    //   (99.98,   89.99,  1.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Basic')),
    //   (99.98,   89.99,  1.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Basic')),
    //   (159.98,  69.99,  0.99,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Pro')),
    //   (159.98,  69.99,  0.99,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Pro')),
    //   (219.98,  55.99,  0.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Enterprise')),
    //   (219.98,  55.99,  0.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'EUR'), (SELECT id FROM plan WHERE name = 'Enterprise')),

    //   (168.98,  119.99, 2.49,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Basic')),
    //   (168.98,  119.99, 2.49,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Basic')),
    //   (239.98,  99.99,  1.89,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Pro')),
    //   (239.98,  99.99,  1.89,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Pro')),
    //   (339.98,  79.99,  1.09,  0,  'MONTHLY', (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Enterprise')),
    //   (339.98,  79.99,  1.09,  16, 'ANNUAL',  (SELECT id FROM currency WHERE code = 'BRL'), (SELECT id FROM plan WHERE name = 'Enterprise'))
    //   ;`
    // );

    await queryRunner.query(
      `INSERT INTO "subscription" (price, restaurant_limit, product_limit, expires_at, plan_id) VALUES 
      (0, 999999, 999999, '2050-01-01 00:00:00.000 +0000', (SELECT id FROM plan WHERE name = 'Premium'));`
    );

    await queryRunner.query(
      `INSERT INTO company ("name", company_url, currency_id, subscription_id) VALUES 
      ('Menu Eazy', 'menu-eazy',
      (SELECT id FROM currency WHERE code = 'USD'), 
      (SELECT id FROM "subscription" WHERE restaurant_limit = 999999 and price = 0));`
    );

    await queryRunner.query(
      `INSERT INTO "user" ("name", email, password, phone, role, company_id) VALUES 
      ('Menu Eazy', '${env.ADMIN.email}', '$2b$12$Sdv3JxnKG2fDCEjqR0miK.jU6n1EIWniClulUUCzTE793Nkrrqm4G', '${env.ADMIN.phone}', 'ADMIN', (SELECT id FROM company WHERE company_url = 'menu-eazy'));`
    );

    await queryRunner.query(
      `INSERT INTO "color" ("primary", text_primary, secondary, text_secondary, text, background) VALUES 
      ('#5E17EB', '#FFFFFF', '#A07CF0', '#2E0C73', '#1E1E1E', '#F4F1FF'),
      ('#005CA9', '#FFFFFF', '#0091D5', '#003D73', '#1E1E1E', '#E3F2FD'),
      ('#D97706', '#FFFFFF', '#F59E0B', '#7C4200', '#1E1E1E', '#FFF7E6');`
    );

    await queryRunner.query(
      `INSERT INTO "style" ("name", generic, color_id, company_id) VALUES 
      ('Neo Purple', true, (SELECT id FROM color WHERE "primary" = '#5E17EB' AND text_primary = '#FFFFFF' AND secondary = '#A07CF0' AND text_secondary = '#2E0C73' AND text = '#1E1E1E' AND background = '#F4F1FF'), (SELECT id FROM company WHERE company_url = 'menu-eazy')),
      ('Deep Blue', true, (SELECT id FROM color WHERE "primary" = '#005CA9' AND text_primary = '#FFFFFF' AND secondary = '#0091D5' AND text_secondary = '#003D73' AND text = '#1E1E1E' AND background = '#E3F2FD'), (SELECT id FROM company WHERE company_url = 'menu-eazy')),
      ('Warm Sunset', true, (SELECT id FROM color WHERE "primary" = '#D97706' AND text_primary = '#FFFFFF' AND secondary = '#F59E0B' AND text_secondary = '#7C4200' AND text = '#1E1E1E' AND background = '#FFF7E6'), (SELECT id FROM company WHERE company_url = 'menu-eazy'));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "style" 
       WHERE ("name", generic) IN (
          ('Neo Purple', true),
          ('Deep Blue', true),
          ('Warm Sunset', true)
       );`
    );

    await queryRunner.query(
      `DELETE FROM "color" 
       WHERE (primary, text_primary, secondary, text_secondary, text, background) IN (
          ('#5E17EB', '#FFFFFF', '#A07CF0', '#2E0C73', '#1E1E1E', '#F4F1FF'),
          ('#005CA9', '#FFFFFF', '#0091D5', '#003D73', '#1E1E1E', '#E3F2FD'),
          ('#D97706', '#FFFFFF', '#F59E0B', '#7C4200', '#1E1E1E', '#FFF7E6')
       );`
    );

    await queryRunner.query(`DELETE FROM user WHERE email = ${env.ADMIN.email};`);

    await queryRunner.query(`DELETE FROM company WHERE company_url = 'menu-eazy';`);

    await queryRunner.query(
      `DELETE FROM "subscription" WHERE restaurant_limit = 999999 and price = 0;`
    );

    await queryRunner.query(
      `DELETE FROM plan_price WHERE plan_id IN (SELECT id FROM plan WHERE name IN ('Basic', 'Pro', 'Enterprise', 'Premium'));`
    );

    await queryRunner.query(
      `DELETE FROM plan WHERE name IN ('Basic', 'Pro', 'Enterprise', 'Premium');`
    );

    await queryRunner.query(`DELETE FROM currency WHERE code IN ('USD', 'BRL', 'EUR');`);
  }
}
