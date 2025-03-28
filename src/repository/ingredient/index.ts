import { IngredientEntity } from '@entity/ingredient';
import { DataSource } from '@infra/database';

export const ingredientRepository = DataSource.getRepository(IngredientEntity);
