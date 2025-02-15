import { DataSource } from '@infra/database';
import { RestaurantAddressEntity } from '@entity/restaurant-address';

export const restaurantAddressRepository = DataSource.getRepository(RestaurantAddressEntity);
