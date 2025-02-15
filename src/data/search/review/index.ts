import type { FindOptionsSelect } from 'typeorm';
import type { ReviewEntity } from '@entity/review';

export const reviewFindParams: FindOptionsSelect<ReviewEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
