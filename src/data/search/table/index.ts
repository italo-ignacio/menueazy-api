import type { TableEntity } from '@entity/table';
import type { FindOptionsSelect } from 'typeorm';

export const tableFindParams: FindOptionsSelect<TableEntity> = {
  id: true,
  code: true,
  description: true,
  name: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
