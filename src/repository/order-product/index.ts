import { DataSource } from '@infra/database';
import { OrderProductEntity } from '@entity/order-product';

export const orderProductRepository = DataSource.getRepository(OrderProductEntity);
