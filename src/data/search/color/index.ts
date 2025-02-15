import type { FindOptionsSelect } from 'typeorm';
import type { ColorEntity } from '@entity/color';

export const colorFindParams: FindOptionsSelect<ColorEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
