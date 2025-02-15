import { DataSource } from '@infra/database';
import { DeviceEntity } from '@entity/device';

export const deviceRepository = DataSource.getRepository(DeviceEntity);
