import { api } from '@domain/helpers';
import { langMiddleware } from '@main/middleware';
import {
  validateAdminMiddleware,
  validateClientMiddleware,
  validateEditMiddleware,
  validateViewMiddleware
} from '@main/middleware/validation';
import type { Express } from 'express';
import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const adminRouter = Router();
  const viewRouter = Router();
  const editRouter = Router();
  const clientRouter = Router();

  readdirSync(join(__dirname, '..', '..', 'routes', 'public')).map(async (file) =>
    (await import(`../../routes/public/${file}`)).default(publicRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'admin')).map(async (file) =>
    (await import(`../../routes/admin/${file}`)).default(adminRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'view')).map(async (file) =>
    (await import(`../../routes/view/${file}`)).default(viewRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'edit')).map(async (file) =>
    (await import(`../../routes/edit/${file}`)).default(editRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'client')).map(async (file) =>
    (await import(`../../routes/client/${file}`)).default(clientRouter)
  );

  app.use(api.baseUrl, langMiddleware(), publicRouter);
  app.use(api.baseUrl, langMiddleware(), validateViewMiddleware(), viewRouter);

  app.use(api.baseUrl, langMiddleware(), validateClientMiddleware(), clientRouter);
  app.use(api.baseUrl, langMiddleware(), validateEditMiddleware(), editRouter);
  app.use(api.baseUrl, langMiddleware(), validateAdminMiddleware(), adminRouter);

  app.get('*', (_, res) => {
    res.send(``);
  });
};
