import type { FindOptionsSelect } from 'typeorm';
import type { SubscriptionEntity } from '@entity/subscription';

export const subscriptionFindParams: FindOptionsSelect<SubscriptionEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
