import type { FindOptionsSelect } from 'typeorm';
import type { CompanyEntity } from '@entity/company';

export const companyFindParams: FindOptionsSelect<CompanyEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
