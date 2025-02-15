import type { FindOptionsSelect } from 'typeorm';
import type { PlanPriceEntity } from '@entity/plan-price';

export const planPriceFindParams: FindOptionsSelect<PlanPriceEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
