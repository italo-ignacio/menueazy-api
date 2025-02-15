import { DataSource } from '@infra/database';
import { OpeningHourEntity } from '@entity/opening-hour';

export const openingHourRepository = DataSource.getRepository(OpeningHourEntity);
