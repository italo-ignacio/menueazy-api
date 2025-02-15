import type { FindOptionsSelect } from 'typeorm';
import type { CurrencyEntity } from '@entity/currency';

export const currencyFindParams: FindOptionsSelect<CurrencyEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
