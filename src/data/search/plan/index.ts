import type { FindOptionsSelect } from 'typeorm';
import type { PlanEntity } from '@entity/plan';

export const planFindParams: FindOptionsSelect<PlanEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
