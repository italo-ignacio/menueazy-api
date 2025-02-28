import type { UserRestaurantEntity } from '@entity/user-restaurant';
import type { FindOptionsSelect } from 'typeorm';

export const userRestaurantFindParams: FindOptionsSelect<UserRestaurantEntity> = {
  id: true,
  restaurantId: true,
  userId: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
