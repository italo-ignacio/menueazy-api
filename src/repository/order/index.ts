import { DataSource } from '@infra/database';
import { OrderEntity } from '@entity/order';

export const orderRepository = DataSource.getRepository(OrderEntity);
