import type { ProductOptionItemEntity } from '@entity/product-option-item';
import type { FindOptionsSelect } from 'typeorm';

export const productOptionItemFindParams: FindOptionsSelect<ProductOptionItemEntity> = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
