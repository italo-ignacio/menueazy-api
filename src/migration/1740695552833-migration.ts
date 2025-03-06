import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740695552833 implements MigrationInterface {
  name = 'Migration1740695552833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "code" character varying(20) NOT NULL, "discount" real NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "coupon_code_key" ON "coupon" ("code") `);
    await queryRunner.query(
      `CREATE TABLE "register_request" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "phone" character varying(25) NOT NULL, "company_name" character varying(255) NOT NULL, "description" text, "code" uuid NOT NULL DEFAULT uuid_generate_v4(), "can_register" boolean NOT NULL DEFAULT false, "numberOfRestaurant" integer NOT NULL, "numberOfProduct" integer NOT NULL, "plan_id" integer NOT NULL, "currency_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_f4a9c8ca778a22ffbca6eaed992" UNIQUE ("code"), CONSTRAINT "PK_c567fb79b69366996980c6380fc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" text, "minimum_of_restaurant" integer NOT NULL, "minimum_of_product" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."plan_price_period_enum" AS ENUM('MONTHLY', 'ANNUAL')`
    );
    await queryRunner.query(
      `CREATE TABLE "plan_price" ("id" SERIAL NOT NULL, "currency_id" integer NOT NULL, "plan_id" integer NOT NULL, "monthly_price" real NOT NULL, "price_of_restaurant" real NOT NULL, "price_of_product" real NOT NULL, "discount" real NOT NULL, "period" "public"."plan_price_period_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_4333279b07456b24b55fff8b740" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "plan_price_currency_plan_period_idx" ON "plan_price" ("currency_id", "plan_id", "period") `
    );
    await queryRunner.query(
      `CREATE TABLE "currency" ("id" SERIAL NOT NULL, "code" character varying(3) NOT NULL, "name" character varying(50) NOT NULL, "symbol" character varying(5) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "currency_code_key" ON "currency" ("code") `);
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "zip_code" character varying(25) NOT NULL, "country" character varying(255) NOT NULL, "complement" character varying(255), "number" character varying(30) NOT NULL, "latitude" numeric(10,8) NOT NULL, "longitude" numeric(11,8) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "client_address" ("id" SERIAL NOT NULL, "address_id" integer NOT NULL, "client_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_fea7ca529948e3e15c4f91b37fc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "device" ("id" SERIAL NOT NULL, "token" text NOT NULL, "code" text NOT NULL, "last_active" TIMESTAMP WITH TIME ZONE, "client_id" integer, "user_id" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_restaurant_restaurant_role_enum" AS ENUM('EDIT', 'VIEW')`
    );
    await queryRunner.query(
      `CREATE TABLE "user_restaurant" ("id" SERIAL NOT NULL, "restaurant_role" "public"."user_restaurant_restaurant_role_enum" NOT NULL, "restaurant_id" integer NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3598cdaa1f61154ba8143c1f322" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'MANAGER', 'OWNER', 'EMPLOYEE', 'DELIVERY_PERSON')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firebase_id" character varying(128) NOT NULL, "email" character varying(255) NOT NULL, "name" character varying(255), "phone" character varying(25), "avatar_url" text, "role" "public"."user_role_enum" NOT NULL, "company_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "user_email_key" ON "user" ("email") `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "user_firebase_id_key" ON "user" ("firebase_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "client_report" ("id" SERIAL NOT NULL, "description" text, "client_id" integer NOT NULL, "order_id" integer, "restaurant_id" integer NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_077d0b8d5e17a4d63b3b982e7c" UNIQUE ("order_id"), CONSTRAINT "PK_7bb8462cb92998e0e86ff81058a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."review_rate_enum" AS ENUM('TERRIBLE', 'BAD', 'AVERAGE', 'GOOD', 'EXCELLENT')`
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" SERIAL NOT NULL, "description" text NOT NULL, "rate" "public"."review_rate_enum" NOT NULL, "client_id" integer NOT NULL, "order_id" integer, "product_id" integer, "restaurant_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "review_client_id_order_id_idx" ON "review" ("client_id", "order_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "phone" character varying(25), "firebase_id" text, "avatar_url" text, "is_blocked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "table" ("id" SERIAL NOT NULL, "code" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "restaurant_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "table_code_key" ON "table" ("code") `);
    await queryRunner.query(
      `CREATE TYPE "public"."order_status_enum" AS ENUM('OPENING', 'PENDING', 'IN_PROGRESS', 'ON_THE_WAY', 'FINISHED', 'CANCELED_BY_RESTAURANT', 'CANCELED_BY_CLIENT')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_type_enum" AS ENUM('RESTAURANT', 'DELIVERY')`
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "delivery_price" numeric(10,2), "observation" text, "status" "public"."order_status_enum" NOT NULL, "type" "public"."order_type_enum" NOT NULL, "client_id" integer, "delivery_person_id" integer, "restaurant_id" integer NOT NULL, "table_id" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_7a9573d6a1fb982772a9123320" ON "order" ("status") `);
    await queryRunner.query(`CREATE INDEX "IDX_cbd56e27bea2abf5d138cd32f9" ON "order" ("type") `);
    await queryRunner.query(`CREATE INDEX "order_status_type_idx" ON "order" ("status", "type") `);
    await queryRunner.query(
      `CREATE TABLE "product_option_group" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "min_selection" integer NOT NULL DEFAULT '0', "max_selection" integer NOT NULL DEFAULT '1', "required" boolean NOT NULL, "product_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d76e92fdbbb5a2e6752ffd4a2c1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_item" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "image_url" text, "product_id" integer, "product_option_group_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_8559d5b48467930210ce983e3f3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order_product_option_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "order_product_id" integer NOT NULL, "product_option_item_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9656ecf7004f670538ed959f622" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_product_status_enum" AS ENUM('PENDING', 'PREPARING', 'FINISHED', 'CANCELED_BY_RESTAURANT', 'CANCELED_BY_CLIENT')`
    );
    await queryRunner.query(
      `CREATE TABLE "order_product" ("id" SERIAL NOT NULL, "observation" text, "order_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "status" "public"."order_product_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product_image" ("id" SERIAL NOT NULL, "url" text NOT NULL, "primary" boolean NOT NULL DEFAULT false, "product_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "out_of_stock" boolean NOT NULL DEFAULT false, "start_sell_at" TIMESTAMP WITH TIME ZONE NOT NULL, "finish_sell_at" TIMESTAMP WITH TIME ZONE, "discount" real, "start_discount_at" TIMESTAMP WITH TIME ZONE, "finish_discount_at" TIMESTAMP WITH TIME ZONE, "only_in_restaurant" boolean NOT NULL DEFAULT false, "price_by_km_in_delivery" real, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, "restaurant_id" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product_category" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "product_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text, "restaurant_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."opening_hour_day_of_week_enum" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY')`
    );
    await queryRunner.query(
      `CREATE TABLE "opening_hour" ("id" SERIAL NOT NULL, "day_of_week" "public"."opening_hour_day_of_week_enum" NOT NULL, "opening_time" TIME WITH TIME ZONE NOT NULL, "closing_time" TIME WITH TIME ZONE NOT NULL, "restaurant_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_6551ceb95c04da8afd85da470c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payment_method" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" text, "logo_url" text, "restaurant_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "color" ("id" SERIAL NOT NULL, "primary" character varying(7) NOT NULL, "text_primary" character varying(7) NOT NULL, "secondary" character varying(7) NOT NULL, "text_secondary" character varying(7) NOT NULL, "background" character varying(7) NOT NULL, "text" character varying(7) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "style" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "generic" boolean NOT NULL DEFAULT false, "color_id" integer NOT NULL, "company_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_12a3ba7fe23b5386181ac6b0ac0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "phone" character varying(25) NOT NULL, "restaurant_url" character varying(255) NOT NULL, "contact_link" text, "description" text, "logo_url" text, "open" boolean NOT NULL, "open_for_delivery" boolean, "has_delivery" boolean NOT NULL, "minimum_order_price" real NOT NULL, "max_delivery_distance_in_km" real NOT NULL DEFAULT '10', "minimum_delivery_price" real NOT NULL DEFAULT '5', "price_by_km_in_delivery" real NOT NULL DEFAULT '2', "company_id" integer NOT NULL, "style_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "restaurant_restaurant_url_key" ON "restaurant" ("restaurant_url") `
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "logo_url" text, "company_url" character varying(255) NOT NULL, "custom_domain" character varying(255), "dns_cname" character varying(255), "domain_verified" boolean NOT NULL DEFAULT false, "currency_id" integer NOT NULL, "subscription_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_8b9e234380f132cb34950b0d83" UNIQUE ("subscription_id"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "company_custom_domain_key" ON "company" ("custom_domain") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "company_company_url_key" ON "company" ("company_url") `
    );
    await queryRunner.query(
      `CREATE INDEX "company_custom_domain_domain_verified_idx" ON "company" ("custom_domain", "domain_verified") `
    );
    await queryRunner.query(
      `CREATE INDEX "company_company_url_domain_verified_idx" ON "company" ("company_url", "domain_verified") `
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "restaurant_limit" integer NOT NULL, "product_limit" integer NOT NULL, "code" uuid NOT NULL, "plan_id" integer NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "contact_admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_73c5e37cd0bb0c5a42d9ffa704f" UNIQUE ("code"), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "subscription_coupon" ("id" SERIAL NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "coupon_id" integer NOT NULL, "subscription_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "finished_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9d205b7b3b05e92236796d6c5b9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" ADD CONSTRAINT "FK_36c3289bf9666dae78afdd9d34a" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" ADD CONSTRAINT "FK_cd0d308f1fa7b7dd2e6ada98ec1" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" ADD CONSTRAINT "FK_48e7523cff9254b10de140391f3" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" ADD CONSTRAINT "FK_2cf5de8b517154bf3e8133bbc35" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" ADD CONSTRAINT "FK_5d748613d45a8988c741592de72" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" ADD CONSTRAINT "FK_3d8c00d2213b8fdefc2d18a11de" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "FK_9c2daf767da7c10c34ea1dc959c" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "FK_ae7154510495c7ddda951b07a07" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ADD CONSTRAINT "FK_2bef55841397728f1a115db6cd6" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ADD CONSTRAINT "FK_b3e0fe9e839c5d6e6b4600272db" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_242a224ac3b9de712b22156eea8" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_077d0b8d5e17a4d63b3b982e7cc" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_6e6c2d16e440a81d9ac1690b61c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_5d38bbab7f723d0dbf8b8ac4ced" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_95b4949a6a3e9c672dcb9449766" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_d816563052236db6adc852f90ee" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_9e0a456057cd16f910bfad306ad" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "table" ADD CONSTRAINT "FK_1e79a861b6be1078a6b79e48ff9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_4e1698719a458d900ded8ca4dbd" FOREIGN KEY ("delivery_person_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_2e52c3d2ee23b941afed22f6a38" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" ADD CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" ADD CONSTRAINT "FK_ed920514abb31117eb5d93e492a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" ADD CONSTRAINT "FK_938f0241dbe04d08307dcd90824" FOREIGN KEY ("product_option_group_id") REFERENCES "product_option_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ADD CONSTRAINT "FK_02b03795c2bddbd4d094b5be1f8" FOREIGN KEY ("order_product_id") REFERENCES "order_product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ADD CONSTRAINT "FK_305ae37992a549ab7dc8694665f" FOREIGN KEY ("product_option_item_id") REFERENCES "product_option_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" ADD CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_2df1f83329c00e6eadde0493e16" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_0374879a971928bc3f57eed0a59" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_48be827a112f05347b53cbc330b" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "opening_hour" ADD CONSTRAINT "FK_7c199e7e28966039d41d06e94c9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_87de3f121e74bb227ae39b98634" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "style" ADD CONSTRAINT "FK_f28e919f60700224ed85e73495e" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "style" ADD CONSTRAINT "FK_6ac04dca5a4b24bb36e3634b951" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_cf75770225dd1ac08d0ccd3ac61" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_ff09dd00d69decac4f6f9c927f3" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_8b9e234380f132cb34950b0d830" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ADD CONSTRAINT "FK_7f037c85a666ed69653c6cb7d45" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ADD CONSTRAINT "FK_0550a46db8669e7c84a67b3c58c" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" DROP CONSTRAINT "FK_0550a46db8669e7c84a67b3c58c"`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" DROP CONSTRAINT "FK_7f037c85a666ed69653c6cb7d45"`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c"`
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_8b9e234380f132cb34950b0d830"`
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_ff09dd00d69decac4f6f9c927f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_cf75770225dd1ac08d0ccd3ac61"`
    );
    await queryRunner.query(`ALTER TABLE "style" DROP CONSTRAINT "FK_6ac04dca5a4b24bb36e3634b951"`);
    await queryRunner.query(`ALTER TABLE "style" DROP CONSTRAINT "FK_f28e919f60700224ed85e73495e"`);
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP CONSTRAINT "FK_87de3f121e74bb227ae39b98634"`
    );
    await queryRunner.query(
      `ALTER TABLE "opening_hour" DROP CONSTRAINT "FK_7c199e7e28966039d41d06e94c9"`
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_48be827a112f05347b53cbc330b"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_0374879a971928bc3f57eed0a59"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_2df1f83329c00e6eadde0493e16"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" DROP CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" DROP CONSTRAINT "FK_305ae37992a549ab7dc8694665f"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" DROP CONSTRAINT "FK_02b03795c2bddbd4d094b5be1f8"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" DROP CONSTRAINT "FK_938f0241dbe04d08307dcd90824"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" DROP CONSTRAINT "FK_ed920514abb31117eb5d93e492a"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" DROP CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf"`
    );
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_2e52c3d2ee23b941afed22f6a38"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_4e1698719a458d900ded8ca4dbd"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0"`);
    await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_1e79a861b6be1078a6b79e48ff9"`);
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_9e0a456057cd16f910bfad306ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_26b533e15b5f2334c96339a1f08"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_d816563052236db6adc852f90ee"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_95b4949a6a3e9c672dcb9449766"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_5d38bbab7f723d0dbf8b8ac4ced"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_6e6c2d16e440a81d9ac1690b61c"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_077d0b8d5e17a4d63b3b982e7cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_242a224ac3b9de712b22156eea8"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`);
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" DROP CONSTRAINT "FK_b3e0fe9e839c5d6e6b4600272db"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" DROP CONSTRAINT "FK_2bef55841397728f1a115db6cd6"`
    );
    await queryRunner.query(
      `ALTER TABLE "device" DROP CONSTRAINT "FK_ae7154510495c7ddda951b07a07"`
    );
    await queryRunner.query(
      `ALTER TABLE "device" DROP CONSTRAINT "FK_9c2daf767da7c10c34ea1dc959c"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" DROP CONSTRAINT "FK_3d8c00d2213b8fdefc2d18a11de"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" DROP CONSTRAINT "FK_5d748613d45a8988c741592de72"`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" DROP CONSTRAINT "FK_2cf5de8b517154bf3e8133bbc35"`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" DROP CONSTRAINT "FK_48e7523cff9254b10de140391f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" DROP CONSTRAINT "FK_cd0d308f1fa7b7dd2e6ada98ec1"`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" DROP CONSTRAINT "FK_36c3289bf9666dae78afdd9d34a"`
    );
    await queryRunner.query(`DROP TABLE "subscription_coupon"`);
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP INDEX "public"."company_company_url_domain_verified_idx"`);
    await queryRunner.query(`DROP INDEX "public"."company_custom_domain_domain_verified_idx"`);
    await queryRunner.query(`DROP INDEX "public"."company_company_url_key"`);
    await queryRunner.query(`DROP INDEX "public"."company_custom_domain_key"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP INDEX "public"."restaurant_restaurant_url_key"`);
    await queryRunner.query(`DROP TABLE "restaurant"`);
    await queryRunner.query(`DROP TABLE "style"`);
    await queryRunner.query(`DROP TABLE "color"`);
    await queryRunner.query(`DROP TABLE "payment_method"`);
    await queryRunner.query(`DROP TABLE "opening_hour"`);
    await queryRunner.query(`DROP TYPE "public"."opening_hour_day_of_week_enum"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "product_category"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "product_image"`);
    await queryRunner.query(`DROP TABLE "order_product"`);
    await queryRunner.query(`DROP TYPE "public"."order_product_status_enum"`);
    await queryRunner.query(`DROP TABLE "order_product_option_item"`);
    await queryRunner.query(`DROP TABLE "product_option_item"`);
    await queryRunner.query(`DROP TABLE "product_option_group"`);
    await queryRunner.query(`DROP INDEX "public"."order_status_type_idx"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_cbd56e27bea2abf5d138cd32f9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7a9573d6a1fb982772a9123320"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "public"."order_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
    await queryRunner.query(`DROP INDEX "public"."table_code_key"`);
    await queryRunner.query(`DROP TABLE "table"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP INDEX "public"."review_client_id_order_id_idx"`);
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(`DROP TYPE "public"."review_rate_enum"`);
    await queryRunner.query(`DROP TABLE "client_report"`);
    await queryRunner.query(`DROP INDEX "public"."user_firebase_id_key"`);
    await queryRunner.query(`DROP INDEX "public"."user_email_key"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "user_restaurant"`);
    await queryRunner.query(`DROP TYPE "public"."user_restaurant_restaurant_role_enum"`);
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(`DROP TABLE "client_address"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP INDEX "public"."currency_code_key"`);
    await queryRunner.query(`DROP TABLE "currency"`);
    await queryRunner.query(`DROP INDEX "public"."plan_price_currency_plan_period_idx"`);
    await queryRunner.query(`DROP TABLE "plan_price"`);
    await queryRunner.query(`DROP TYPE "public"."plan_price_period_enum"`);
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`DROP TABLE "register_request"`);
    await queryRunner.query(`DROP INDEX "public"."coupon_code_key"`);
    await queryRunner.query(`DROP TABLE "coupon"`);
  }
}
