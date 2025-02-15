import { DataSource } from '@infra/database';
import { ProductRestaurantEntity } from '@entity/product-restaurant';

export const productRestaurantRepository = DataSource.getRepository(ProductRestaurantEntity);
