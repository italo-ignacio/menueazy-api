import type { FindOptionsSelect } from 'typeorm';
import type { OrderProductEntity } from '@entity/order-product';

export const orderProductFindParams: FindOptionsSelect<OrderProductEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
