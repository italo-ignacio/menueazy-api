import { DataSource } from '@infra/database';
import { ProductImageEntity } from '@entity/product-image';

export const productImageRepository = DataSource.getRepository(ProductImageEntity);
