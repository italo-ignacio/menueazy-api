import { IngredientDataEntity } from '@entity/ingredient-data';
import { DataSource } from '@infra/database';

export const ingredientDataRepository = DataSource.getRepository(IngredientDataEntity);
