import { DataSource } from '@infra/database';
import { TableEntity } from '@entity/table';

export const tableRepository = DataSource.getRepository(TableEntity);
