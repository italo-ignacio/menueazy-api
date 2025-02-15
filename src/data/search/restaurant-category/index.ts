import type { FindOptionsSelect } from 'typeorm';
import type { RestaurantCategoryEntity } from '@entity/restaurant-category';

export const restaurantCategoryFindParams: FindOptionsSelect<RestaurantCategoryEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
