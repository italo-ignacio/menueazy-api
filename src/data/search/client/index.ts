import type { ClientEntity } from '@entity/client';
import type { FindOptionsSelect } from 'typeorm';

export const clientFindParams: FindOptionsSelect<ClientEntity> = {
  id: true,
  email: true,
  firebaseId: true,
  isBlocked: true,
  name: true,
  phone: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
