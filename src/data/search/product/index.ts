import type { ProductEntity } from '@entity/product';
import type { FindOptionsSelect } from 'typeorm';

export const productFindParams: FindOptionsSelect<ProductEntity> = {
  id: true,
  description: true,
  discount: true,
  finishDiscountAt: true,
  name: true,
  onlyInRestaurant: true,
  outOfStock: true,
  price: true,
  startDiscountAt: true,
  published: true,
  highlight: true,
  priceByKmInDelivery: true,
  productImageList: {
    id: true,
    primary: true,
    url: true,
    createdAt: true,
    updatedAt: true,
    finishedAt: true
  },

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
