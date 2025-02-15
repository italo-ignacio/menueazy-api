import type { FindOptionsSelect } from 'typeorm';
import type { OrderProductOptionItemEntity } from '@entity/order-product-option-item';

export const orderProductOptionItemFindParams: FindOptionsSelect<OrderProductOptionItemEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
