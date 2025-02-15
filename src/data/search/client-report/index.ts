import type { FindOptionsSelect } from 'typeorm';
import type { ClientReportEntity } from '@entity/client-report';

export const clientReportFindParams: FindOptionsSelect<ClientReportEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
