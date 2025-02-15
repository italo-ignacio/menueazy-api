import { DataSource } from '@infra/database';
import { ClientReportEntity } from '@entity/client-report';

export const clientReportRepository = DataSource.getRepository(ClientReportEntity);
