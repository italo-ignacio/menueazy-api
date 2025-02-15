import type { FindOptionsSelect } from 'typeorm';
import type { ClientAddressEntity } from '@entity/client-address';

export const clientAddressFindParams: FindOptionsSelect<ClientAddressEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
