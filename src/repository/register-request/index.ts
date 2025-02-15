import { DataSource } from '@infra/database';
import { RegisterRequestEntity } from '@entity/register-request';

export const registerRequestRepository = DataSource.getRepository(RegisterRequestEntity);
