import type { PlanEntity } from '@entity/plan';
import type { FindOptionsSelect } from 'typeorm';
import { planPriceFindParams } from '../plan-price';

export const planFindParams: FindOptionsSelect<PlanEntity> = {
  id: true,
  description: true,
  minimumOfProduct: true,
  minimumOfRestaurant: true,
  name: true,
  planPriceList: planPriceFindParams,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
