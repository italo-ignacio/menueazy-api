import { DataSource } from '@infra/database';
import { PlanEntity } from '@entity/plan';

export const planRepository = DataSource.getRepository(PlanEntity);
