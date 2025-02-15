import type { FindOptionsSelect } from 'typeorm';
import type { OpeningHourEntity } from '@entity/opening-hour';

export const openingHourFindParams: FindOptionsSelect<OpeningHourEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
