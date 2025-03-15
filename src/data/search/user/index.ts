import type { UserEntity } from '@entity/user';
import type { FindOptionsSelect } from 'typeorm';

export const userFindParams: FindOptionsSelect<UserEntity> = {
  id: true,
  email: true,
  name: true,
  phone: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
