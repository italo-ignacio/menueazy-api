import type { IngredientDataEntity } from '@entity/ingredient-data';
import type { FindOptionsSelect } from 'typeorm';

export const ingredientDataFindParams: FindOptionsSelect<IngredientDataEntity> = {
  id: true,
  entryQuantity: true,
  expiresAt: true,
  quantity: true,
  unitPrice: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
