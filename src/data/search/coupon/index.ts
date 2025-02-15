import type { FindOptionsSelect } from 'typeorm';
import type { CouponEntity } from '@entity/coupon';

export const couponFindParams: FindOptionsSelect<CouponEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
