import type { FindOptionsSelect } from 'typeorm';
import type { StyleEntity } from '@entity/style';

export const styleFindParams: FindOptionsSelect<StyleEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
