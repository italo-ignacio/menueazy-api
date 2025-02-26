import type { OpeningHourEntity } from '@entity/opening-hour';
import type { FindOptionsSelect } from 'typeorm';

export const openingHourFindParams: FindOptionsSelect<OpeningHourEntity> = {
  id: true,
  closingTime: true,
  dayOfWeek: true,
  openingTime: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
