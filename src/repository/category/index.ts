import { DataSource } from '@infra/database';
import { CategoryEntity } from '@entity/category';

export const categoryRepository = DataSource.getRepository(CategoryEntity);
