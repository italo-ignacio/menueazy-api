import type { AddressEntity } from '@entity/address';
import type { FindOptionsSelect } from 'typeorm';

export const addressFindParams: FindOptionsSelect<AddressEntity> = {
  id: true,
  city: true,
  complement: true,
  country: true,
  latitude: true,
  longitude: true,
  number: true,
  state: true,
  street: true,
  zipCode: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
