import './config/module-alias';

import { DataSource } from '@infra/database';
import { env } from '@main/config';
import { errorLogger } from '@main/utils';
import { credential } from 'firebase-admin';
import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import credentials from './credentials.json';

DataSource.initialize()
  .then(async () => {
    if (typeof env.API_PORT === 'string') {
      const { http } = await import('@main/config');

      initializeApp({ credential: credential.cert(credentials as ServiceAccount) });

      http.listen(env.API_PORT, () => {
        console.info(`Server started at http://localhost:${env.API_PORT}/swagger-doc-api`);
      });
    } else console.info('Environment variables missing');
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(`An error of type ${error.name} occurred. See the logs error...`);
      console.error(error);
    }
    errorLogger(error);
  });
