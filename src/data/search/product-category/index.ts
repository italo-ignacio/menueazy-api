import type { FindOptionsSelect } from 'typeorm';
import type { ProductCategoryEntity } from '@entity/product-category';

export const productCategoryFindParams: FindOptionsSelect<ProductCategoryEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
