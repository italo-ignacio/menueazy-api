import type { CurrencyEntity } from '@entity/currency';
import type { FindOptionsSelect } from 'typeorm';

export const currencyFindParams: FindOptionsSelect<CurrencyEntity> = {
  id: true,
  code: true,
  name: true,
  symbol: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
