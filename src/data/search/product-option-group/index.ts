import type { FindOptionsSelect } from 'typeorm';
import type { ProductOptionGroupEntity } from '@entity/product-option-group';

export const productOptionGroupFindParams: FindOptionsSelect<ProductOptionGroupEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
