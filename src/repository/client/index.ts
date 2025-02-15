import { DataSource } from '@infra/database';
import { ClientEntity } from '@entity/client';

export const clientRepository = DataSource.getRepository(ClientEntity);
