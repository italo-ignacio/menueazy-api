import type { IngredientEntity } from '@entity/ingredient';
import type { FindOptionsSelect } from 'typeorm';

export const ingredientFindParams: FindOptionsSelect<IngredientEntity> = {
  id: true,
  name: true,
  minAlert: true,
  measure: true,
  imageUrl: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
