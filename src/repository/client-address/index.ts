import { DataSource } from '@infra/database';
import { ClientAddressEntity } from '@entity/client-address';

export const clientAddressRepository = DataSource.getRepository(ClientAddressEntity);
