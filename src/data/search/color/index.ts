import type { ColorEntity } from '@entity/color';
import type { FindOptionsSelect } from 'typeorm';

export const colorFindParams: FindOptionsSelect<ColorEntity> = {
  id: true,
  background: true,
  primary: true,
  secondary: true,
  text: true,
  textPrimary: true,
  textSecondary: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
