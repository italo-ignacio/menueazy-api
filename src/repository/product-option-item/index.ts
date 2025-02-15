import { DataSource } from '@infra/database';
import { ProductOptionItemEntity } from '@entity/product-option-item';

export const productOptionItemRepository = DataSource.getRepository(ProductOptionItemEntity);
