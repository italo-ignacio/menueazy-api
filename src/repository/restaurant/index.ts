import { DataSource } from '@infra/database';
import { RestaurantEntity } from '@entity/restaurant';

export const restaurantRepository = DataSource.getRepository(RestaurantEntity);
