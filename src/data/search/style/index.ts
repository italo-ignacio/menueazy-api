import type { StyleEntity } from '@entity/style';
import type { FindOptionsSelect } from 'typeorm';
import { colorFindParams } from '../color';

export const styleFindParams: FindOptionsSelect<StyleEntity> = {
  id: true,
  color: colorFindParams,
  name: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
