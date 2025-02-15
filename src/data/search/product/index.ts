import type { FindOptionsSelect } from 'typeorm';
import type { ProductEntity } from '@entity/product';

export const productFindParams: FindOptionsSelect<ProductEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
