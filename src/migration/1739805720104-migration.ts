import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1739805720104 implements MigrationInterface {
  name = 'Migration1739805720104';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_60bb5eb4d4259187272283ad106"`
    );
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "company_id"`);
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" DROP CONSTRAINT "FK_355400610db376e89b96456c67a"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" DROP CONSTRAINT "FK_b9f81c9708a9ccd5e3c7b82e32c"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ALTER COLUMN "category_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ALTER COLUMN "restaurant_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_2df1f83329c00e6eadde0493e16"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_0374879a971928bc3f57eed0a59"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ALTER COLUMN "category_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ALTER COLUMN "product_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" DROP CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3"`
    );
    await queryRunner.query(`ALTER TABLE "product_image" ALTER COLUMN "product_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_option_group" DROP CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" ALTER COLUMN "product_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_95b4949a6a3e9c672dcb9449766"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_9e0a456057cd16f910bfad306ad"`
    );
    await queryRunner.query(`DROP INDEX "public"."review_client_id_order_id_idx"`);
    await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "client_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "restaurant_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23"`
    );
    await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "restaurant_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_option_item" DROP CONSTRAINT "FK_938f0241dbe04d08307dcd90824"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" ALTER COLUMN "product_option_group_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" DROP CONSTRAINT "FK_02b03795c2bddbd4d094b5be1f8"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" DROP CONSTRAINT "FK_305ae37992a549ab7dc8694665f"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ALTER COLUMN "order_product_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ALTER COLUMN "product_option_item_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`
    );
    await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "order_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "product_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_1e79a861b6be1078a6b79e48ff9"`);
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "restaurant_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" DROP CONSTRAINT "FK_7f037c85a666ed69653c6cb7d45"`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" DROP CONSTRAINT "FK_0550a46db8669e7c84a67b3c58c"`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ALTER COLUMN "coupon_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ALTER COLUMN "subscription_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c"`
    );
    await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "plan_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "plan_price" DROP CONSTRAINT "FK_48e7523cff9254b10de140391f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" DROP CONSTRAINT "FK_2cf5de8b517154bf3e8133bbc35"`
    );
    await queryRunner.query(`DROP INDEX "public"."plan_price_currency_plan_period_idx"`);
    await queryRunner.query(`ALTER TABLE "plan_price" ALTER COLUMN "currency_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "plan_price" ALTER COLUMN "plan_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "register_request" DROP CONSTRAINT "FK_cd0d308f1fa7b7dd2e6ada98ec1"`
    );
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "currency_id" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "style" DROP CONSTRAINT "FK_f28e919f60700224ed85e73495e"`);
    await queryRunner.query(`ALTER TABLE "style" DROP CONSTRAINT "FK_6ac04dca5a4b24bb36e3634b951"`);
    await queryRunner.query(`ALTER TABLE "style" ALTER COLUMN "color_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "style" ALTER COLUMN "company_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_ff09dd00d69decac4f6f9c927f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_8b9e234380f132cb34950b0d830"`
    );
    await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "currency_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "subscription_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "company_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911"`);
    await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "restaurant_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "order_address" DROP CONSTRAINT "FK_80aa0894c299459b2a6d0d39e01"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_address" DROP CONSTRAINT "FK_bd8424734e4ed6b3113b2b9dd19"`
    );
    await queryRunner.query(`ALTER TABLE "order_address" ALTER COLUMN "address_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "order_address" ALTER COLUMN "order_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "client_address" DROP CONSTRAINT "FK_5d748613d45a8988c741592de72"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" DROP CONSTRAINT "FK_3d8c00d2213b8fdefc2d18a11de"`
    );
    await queryRunner.query(`ALTER TABLE "client_address" ALTER COLUMN "address_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "client_address" ALTER COLUMN "client_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_242a224ac3b9de712b22156eea8"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_6e6c2d16e440a81d9ac1690b61c"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_5d38bbab7f723d0dbf8b8ac4ced"`
    );
    await queryRunner.query(`ALTER TABLE "client_report" ALTER COLUMN "client_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "client_report" ALTER COLUMN "restaurant_id" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "client_report" ALTER COLUMN "user_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "opening_hour" DROP CONSTRAINT "FK_7c199e7e28966039d41d06e94c9"`
    );
    await queryRunner.query(`ALTER TABLE "opening_hour" ALTER COLUMN "restaurant_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP CONSTRAINT "FK_87de3f121e74bb227ae39b98634"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ALTER COLUMN "restaurant_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_cf75770225dd1ac08d0ccd3ac61"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b"`
    );
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "company_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "style_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" DROP CONSTRAINT "FK_2bef55841397728f1a115db6cd6"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" DROP CONSTRAINT "FK_b3e0fe9e839c5d6e6b4600272db"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ALTER COLUMN "restaurant_id" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user_restaurant" ALTER COLUMN "user_id" SET NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "review_client_id_order_id_idx" ON "review" ("client_id", "order_id") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "plan_price_currency_plan_period_idx" ON "plan_price" ("currency_id", "plan_id", "period") `
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ADD CONSTRAINT "FK_355400610db376e89b96456c67a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ADD CONSTRAINT "FK_b9f81c9708a9ccd5e3c7b82e32c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_2df1f83329c00e6eadde0493e16" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_0374879a971928bc3f57eed0a59" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" ADD CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" ADD CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_95b4949a6a3e9c672dcb9449766" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_9e0a456057cd16f910bfad306ad" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
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
      `ALTER TABLE "table" ADD CONSTRAINT "FK_1e79a861b6be1078a6b79e48ff9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ADD CONSTRAINT "FK_7f037c85a666ed69653c6cb7d45" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ADD CONSTRAINT "FK_0550a46db8669e7c84a67b3c58c" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" ADD CONSTRAINT "FK_48e7523cff9254b10de140391f3" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" ADD CONSTRAINT "FK_2cf5de8b517154bf3e8133bbc35" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" ADD CONSTRAINT "FK_cd0d308f1fa7b7dd2e6ada98ec1" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "style" ADD CONSTRAINT "FK_f28e919f60700224ed85e73495e" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "style" ADD CONSTRAINT "FK_6ac04dca5a4b24bb36e3634b951" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_ff09dd00d69decac4f6f9c927f3" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_8b9e234380f132cb34950b0d830" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_address" ADD CONSTRAINT "FK_80aa0894c299459b2a6d0d39e01" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_address" ADD CONSTRAINT "FK_bd8424734e4ed6b3113b2b9dd19" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" ADD CONSTRAINT "FK_5d748613d45a8988c741592de72" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" ADD CONSTRAINT "FK_3d8c00d2213b8fdefc2d18a11de" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_242a224ac3b9de712b22156eea8" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_6e6c2d16e440a81d9ac1690b61c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_5d38bbab7f723d0dbf8b8ac4ced" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "opening_hour" ADD CONSTRAINT "FK_7c199e7e28966039d41d06e94c9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_87de3f121e74bb227ae39b98634" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_cf75770225dd1ac08d0ccd3ac61" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ADD CONSTRAINT "FK_2bef55841397728f1a115db6cd6" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ADD CONSTRAINT "FK_b3e0fe9e839c5d6e6b4600272db" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" DROP CONSTRAINT "FK_b3e0fe9e839c5d6e6b4600272db"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" DROP CONSTRAINT "FK_2bef55841397728f1a115db6cd6"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_cf75770225dd1ac08d0ccd3ac61"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP CONSTRAINT "FK_87de3f121e74bb227ae39b98634"`
    );
    await queryRunner.query(
      `ALTER TABLE "opening_hour" DROP CONSTRAINT "FK_7c199e7e28966039d41d06e94c9"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_5d38bbab7f723d0dbf8b8ac4ced"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_6e6c2d16e440a81d9ac1690b61c"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" DROP CONSTRAINT "FK_242a224ac3b9de712b22156eea8"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" DROP CONSTRAINT "FK_3d8c00d2213b8fdefc2d18a11de"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" DROP CONSTRAINT "FK_5d748613d45a8988c741592de72"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_address" DROP CONSTRAINT "FK_bd8424734e4ed6b3113b2b9dd19"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_address" DROP CONSTRAINT "FK_80aa0894c299459b2a6d0d39e01"`
    );
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`);
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_8b9e234380f132cb34950b0d830"`
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_ff09dd00d69decac4f6f9c927f3"`
    );
    await queryRunner.query(`ALTER TABLE "style" DROP CONSTRAINT "FK_6ac04dca5a4b24bb36e3634b951"`);
    await queryRunner.query(`ALTER TABLE "style" DROP CONSTRAINT "FK_f28e919f60700224ed85e73495e"`);
    await queryRunner.query(
      `ALTER TABLE "register_request" DROP CONSTRAINT "FK_cd0d308f1fa7b7dd2e6ada98ec1"`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" DROP CONSTRAINT "FK_2cf5de8b517154bf3e8133bbc35"`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" DROP CONSTRAINT "FK_48e7523cff9254b10de140391f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c"`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" DROP CONSTRAINT "FK_0550a46db8669e7c84a67b3c58c"`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" DROP CONSTRAINT "FK_7f037c85a666ed69653c6cb7d45"`
    );
    await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_1e79a861b6be1078a6b79e48ff9"`);
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
      `ALTER TABLE "product" DROP CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_9e0a456057cd16f910bfad306ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_95b4949a6a3e9c672dcb9449766"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" DROP CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" DROP CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_0374879a971928bc3f57eed0a59"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_2df1f83329c00e6eadde0493e16"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" DROP CONSTRAINT "FK_b9f81c9708a9ccd5e3c7b82e32c"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" DROP CONSTRAINT "FK_355400610db376e89b96456c67a"`
    );
    await queryRunner.query(`DROP INDEX "public"."plan_price_currency_plan_period_idx"`);
    await queryRunner.query(`DROP INDEX "public"."review_client_id_order_id_idx"`);
    await queryRunner.query(`ALTER TABLE "user_restaurant" ALTER COLUMN "user_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ALTER COLUMN "restaurant_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ADD CONSTRAINT "FK_b3e0fe9e839c5d6e6b4600272db" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_restaurant" ADD CONSTRAINT "FK_2bef55841397728f1a115db6cd6" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "style_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "company_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_9533b28cbb70a517b17a0fae44b" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_cf75770225dd1ac08d0ccd3ac61" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ALTER COLUMN "restaurant_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_87de3f121e74bb227ae39b98634" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "opening_hour" ALTER COLUMN "restaurant_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "opening_hour" ADD CONSTRAINT "FK_7c199e7e28966039d41d06e94c9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "client_report" ALTER COLUMN "user_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "client_report" ALTER COLUMN "restaurant_id" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "client_report" ALTER COLUMN "client_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_5d38bbab7f723d0dbf8b8ac4ced" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_6e6c2d16e440a81d9ac1690b61c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_report" ADD CONSTRAINT "FK_242a224ac3b9de712b22156eea8" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "client_address" ALTER COLUMN "client_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "client_address" ALTER COLUMN "address_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "client_address" ADD CONSTRAINT "FK_3d8c00d2213b8fdefc2d18a11de" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "client_address" ADD CONSTRAINT "FK_5d748613d45a8988c741592de72" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "order_address" ALTER COLUMN "order_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "order_address" ALTER COLUMN "address_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "order_address" ADD CONSTRAINT "FK_bd8424734e4ed6b3113b2b9dd19" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_address" ADD CONSTRAINT "FK_80aa0894c299459b2a6d0d39e01" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "restaurant_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "company_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "subscription_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "currency_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_8b9e234380f132cb34950b0d830" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_ff09dd00d69decac4f6f9c927f3" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "style" ALTER COLUMN "company_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "style" ALTER COLUMN "color_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "style" ADD CONSTRAINT "FK_6ac04dca5a4b24bb36e3634b951" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "style" ADD CONSTRAINT "FK_f28e919f60700224ed85e73495e" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "currency_id" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "register_request" ALTER COLUMN "code" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "register_request" ALTER COLUMN "code" SET DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "register_request" ADD CONSTRAINT "FK_cd0d308f1fa7b7dd2e6ada98ec1" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "plan_price" ALTER COLUMN "plan_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "plan_price" ALTER COLUMN "currency_id" DROP NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "plan_price_currency_plan_period_idx" ON "plan_price" ("period", "currency_id", "plan_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" ADD CONSTRAINT "FK_2cf5de8b517154bf3e8133bbc35" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "plan_price" ADD CONSTRAINT "FK_48e7523cff9254b10de140391f3" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "plan_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_5fde988e5d9b9a522d70ebec27c" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ALTER COLUMN "subscription_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ALTER COLUMN "coupon_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ADD CONSTRAINT "FK_0550a46db8669e7c84a67b3c58c" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_coupon" ADD CONSTRAINT "FK_7f037c85a666ed69653c6cb7d45" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "restaurant_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "table" ADD CONSTRAINT "FK_1e79a861b6be1078a6b79e48ff9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "product_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "order_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ALTER COLUMN "product_option_item_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ALTER COLUMN "order_product_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ADD CONSTRAINT "FK_305ae37992a549ab7dc8694665f" FOREIGN KEY ("product_option_item_id") REFERENCES "product_option_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_option_item" ADD CONSTRAINT "FK_02b03795c2bddbd4d094b5be1f8" FOREIGN KEY ("order_product_id") REFERENCES "order_product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" ALTER COLUMN "product_option_group_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_item" ADD CONSTRAINT "FK_938f0241dbe04d08307dcd90824" FOREIGN KEY ("product_option_group_id") REFERENCES "product_option_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "restaurant_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_71aea1d530c0b4920a8ca0e6a23" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "restaurant_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "client_id" DROP NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "review_client_id_order_id_idx" ON "review" ("client_id", "order_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_9e0a456057cd16f910bfad306ad" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_95b4949a6a3e9c672dcb9449766" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" ALTER COLUMN "product_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" ADD CONSTRAINT "FK_28f273fec3a8f15a46494a1e5cf" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "product_image" ALTER COLUMN "product_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_image" ADD CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ALTER COLUMN "product_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ALTER COLUMN "category_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_0374879a971928bc3f57eed0a59" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_2df1f83329c00e6eadde0493e16" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ALTER COLUMN "restaurant_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ALTER COLUMN "category_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ADD CONSTRAINT "FK_b9f81c9708a9ccd5e3c7b82e32c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_category" ADD CONSTRAINT "FK_355400610db376e89b96456c67a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "review" ADD "company_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_60bb5eb4d4259187272283ad106" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
