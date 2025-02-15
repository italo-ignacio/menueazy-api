import type { FindOptionsSelect } from 'typeorm';
import type { CategoryEntity } from '@entity/category';

export const categoryFindParams: FindOptionsSelect<CategoryEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
