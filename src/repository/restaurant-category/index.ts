import { DataSource } from '@infra/database';
import { RestaurantCategoryEntity } from '@entity/restaurant-category';

export const restaurantCategoryRepository = DataSource.getRepository(RestaurantCategoryEntity);
