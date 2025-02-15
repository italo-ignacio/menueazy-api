import type { RegisterRequestEntity } from '@entity/register-request';
import type { FindOptionsSelect } from 'typeorm';

export const registerRequestFindParams: FindOptionsSelect<RegisterRequestEntity> = {
  id: true,
  canRegister: true,
  code: true,
  companyName: true,
  currency: {
    id: true,
    code: true,
    name: true,
    symbol: true,

    createdAt: true,
    updatedAt: true,
    finishedAt: true
  },
  description: true,
  email: true,
  name: true,
  phone: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
