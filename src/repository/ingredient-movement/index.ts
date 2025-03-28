import { IngredientMovementEntity } from '@entity/ingredient-movement';
import { DataSource } from '@infra/database';

export const ingredientMovementRepository = DataSource.getRepository(IngredientMovementEntity);
