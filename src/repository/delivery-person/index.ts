import { DeliveryPersonEntity } from '@entity/delivery-person';
import { DataSource } from '@infra/database';

export const deliveryPersonRepository = DataSource.getRepository(DeliveryPersonEntity);
