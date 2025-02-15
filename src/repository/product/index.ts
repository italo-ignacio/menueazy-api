import { DataSource } from '@infra/database';
import { ProductEntity } from '@entity/product';

export const productRepository = DataSource.getRepository(ProductEntity);
