import type { FindOptionsSelect } from 'typeorm';
import type { RestaurantAddressEntity } from '@entity/restaurant-address';

export const restaurantAddressFindParams: FindOptionsSelect<RestaurantAddressEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
