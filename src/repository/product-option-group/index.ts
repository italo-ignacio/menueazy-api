import { DataSource } from '@infra/database';
import { ProductOptionGroupEntity } from '@entity/product-option-group';

export const productOptionGroupRepository = DataSource.getRepository(ProductOptionGroupEntity);
