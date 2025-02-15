import type { FindOptionsSelect } from 'typeorm';
import type { TableEntity } from '@entity/table';

export const tableFindParams: FindOptionsSelect<TableEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
