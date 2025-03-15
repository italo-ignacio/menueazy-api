import type { DeliveryPersonEntity } from '@entity/delivery-person';
import type { FindOptionsSelect } from 'typeorm';

export const deliveryPersonFindParams: FindOptionsSelect<DeliveryPersonEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
