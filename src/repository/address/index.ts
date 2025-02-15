import { DataSource } from '@infra/database';
import { AddressEntity } from '@entity/address';

export const addressRepository = DataSource.getRepository(AddressEntity);
