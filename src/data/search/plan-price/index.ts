import type { PlanPriceEntity } from '@entity/plan-price';
import type { FindOptionsSelect } from 'typeorm';
import { currencyFindParams } from '../currency';

export const planPriceFindParams: FindOptionsSelect<PlanPriceEntity> = {
  id: true,
  monthlyPrice: true,
  period: true,
  priceOfProduct: true,
  priceOfRestaurant: true,
  discount: true,
  currency: currencyFindParams,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
