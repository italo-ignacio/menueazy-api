import type { FindOptionsSelect } from 'typeorm';
import type { AddressEntity } from '@entity/address';

export const addressFindParams: FindOptionsSelect<AddressEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
