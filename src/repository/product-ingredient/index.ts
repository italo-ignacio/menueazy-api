import { ProductIngredientEntity } from '@entity/product-ingredient';
import { DataSource } from '@infra/database';

export const productIngredientRepository = DataSource.getRepository(ProductIngredientEntity);
