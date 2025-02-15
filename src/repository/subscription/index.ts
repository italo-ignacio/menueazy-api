import { DataSource } from '@infra/database';
import { SubscriptionEntity } from '@entity/subscription';

export const subscriptionRepository = DataSource.getRepository(SubscriptionEntity);
