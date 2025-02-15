import { DataSource } from '@infra/database';
import { ProductCategoryEntity } from '@entity/product-category';

export const productCategoryRepository = DataSource.getRepository(ProductCategoryEntity);
