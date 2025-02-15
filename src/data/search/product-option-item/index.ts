import type { FindOptionsSelect } from 'typeorm';
import type { ProductOptionItemEntity } from '@entity/product-option-item';

export const productOptionItemFindParams: FindOptionsSelect<ProductOptionItemEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
