import type { FindOptionsSelect } from 'typeorm';
import type { ProductRestaurantEntity } from '@entity/product-restaurant';

export const productRestaurantFindParams: FindOptionsSelect<ProductRestaurantEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
