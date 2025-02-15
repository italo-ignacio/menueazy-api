import type { FindOptionsSelect } from 'typeorm';
import type { OrderAddressEntity } from '@entity/order-address';

export const orderAddressFindParams: FindOptionsSelect<OrderAddressEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
