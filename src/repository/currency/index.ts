import { DataSource } from '@infra/database';
import { CurrencyEntity } from '@entity/currency';

export const currencyRepository = DataSource.getRepository(CurrencyEntity);
