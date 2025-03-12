import type { ProductOptionGroupEntity } from '@entity/product-option-group';
import type { FindOptionsSelect } from 'typeorm';
import { productOptionItemFindParams } from '../product-option-item';

export const productOptionGroupFindParams: FindOptionsSelect<ProductOptionGroupEntity> = {
  id: true,
  description: true,
  maxSelection: true,
  minSelection: true,
  name: true,
  productId: true,
  required: true,

  productOptionItemList: productOptionItemFindParams,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
