import { DataSource } from '@infra/database';
import { StyleEntity } from '@entity/style';

export const styleRepository = DataSource.getRepository(StyleEntity);
