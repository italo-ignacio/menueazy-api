import type { FindOptionsSelect } from 'typeorm';
import type { OrderEntity } from '@entity/order';

export const orderFindParams: FindOptionsSelect<OrderEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
