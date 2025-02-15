import type { FindOptionsSelect } from 'typeorm';
import type { ClientEntity } from '@entity/client';

export const clientFindParams: FindOptionsSelect<ClientEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
