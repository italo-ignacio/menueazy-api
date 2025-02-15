import { DataSource } from '@infra/database';
import { CompanyEntity } from '@entity/company';

export const companyRepository = DataSource.getRepository(CompanyEntity);
