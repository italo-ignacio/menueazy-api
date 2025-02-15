import { DataSource } from '@infra/database';
import { OrderProductOptionItemEntity } from '@entity/order-product-option-item';

export const orderProductOptionItemRepository = DataSource.getRepository(
  OrderProductOptionItemEntity
);
