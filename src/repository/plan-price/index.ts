import { DataSource } from '@infra/database';
import { PlanPriceEntity } from '@entity/plan-price';

export const planPriceRepository = DataSource.getRepository(PlanPriceEntity);
