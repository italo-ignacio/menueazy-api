import type { RestaurantEntity } from '@entity/restaurant';
import type { FindOptionsSelect } from 'typeorm';
import { styleFindParams } from '../style';

export const restaurantFindParams: FindOptionsSelect<RestaurantEntity> = {
  id: true,
  contactLink: true,
  description: true,
  hasDelivery: true,
  logoUrl: true,
  maxDeliveryDistanceInKm: true,
  minimumDeliveryPrice: true,
  minimumOrderPrice: true,
  name: true,
  open: true,
  openForDelivery: true,
  phone: true,
  priceByKmInDelivery: true,
  restaurantUrl: true,
  style: styleFindParams,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
