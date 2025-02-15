import { DataSource } from '@infra/database';
import { CouponEntity } from '@entity/coupon';

export const couponRepository = DataSource.getRepository(CouponEntity);
