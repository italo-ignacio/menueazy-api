import type { ProductIngredientEntity } from '@entity/product-ingredient';
import type { FindOptionsSelect } from 'typeorm';

export const productIngredientFindParams: FindOptionsSelect<ProductIngredientEntity> = {
  id: true,
  additionalPrice: true,
  canAdd: true,
  canRemove: true,
  maxAddQuantity: true,
  quantity: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
