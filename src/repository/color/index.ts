import { DataSource } from '@infra/database';
import { ColorEntity } from '@entity/color';

export const colorRepository = DataSource.getRepository(ColorEntity);
