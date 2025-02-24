import type { SubscriptionEntity } from '@entity/subscription';
import type { FindOptionsSelect } from 'typeorm';

export const subscriptionFindParams: FindOptionsSelect<SubscriptionEntity> = {
  id: true,
  code: true,
  contactAdmin: true,
  expiresAt: true,
  price: true,
  productLimit: true,
  restaurantLimit: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
