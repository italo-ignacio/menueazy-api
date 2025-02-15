import type { FindOptionsSelect } from 'typeorm';
import type { RestaurantEntity } from '@entity/restaurant';

export const restaurantFindParams: FindOptionsSelect<RestaurantEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
