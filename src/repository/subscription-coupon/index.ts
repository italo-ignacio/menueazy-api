import { DataSource } from '@infra/database';
import { SubscriptionCouponEntity } from '@entity/subscription-coupon';

export const subscriptionCouponRepository = DataSource.getRepository(SubscriptionCouponEntity);
