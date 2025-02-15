import type { FindOptionsSelect } from 'typeorm';
import type { SubscriptionCouponEntity } from '@entity/subscription-coupon';

export const subscriptionCouponFindParams: FindOptionsSelect<SubscriptionCouponEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
