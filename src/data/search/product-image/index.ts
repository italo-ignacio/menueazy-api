import type { FindOptionsSelect } from 'typeorm';
import type { ProductImageEntity } from '@entity/product-image';

export const productImageFindParams: FindOptionsSelect<ProductImageEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
