import type { FindOptionsSelect } from 'typeorm';
import type { DeviceEntity } from '@entity/device';

export const deviceFindParams: FindOptionsSelect<DeviceEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
