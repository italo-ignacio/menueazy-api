import { DataSource } from '@infra/database';
import { OrderAddressEntity } from '@entity/order-address';

export const orderAddressRepository = DataSource.getRepository(OrderAddressEntity);
