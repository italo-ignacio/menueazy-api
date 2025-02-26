import { api } from '@domain/helpers';
import { langMiddleware } from '@main/middleware';
import {
  validateAdminMiddleware,
  validateClientMiddleware,
  validateOwnerMiddleware,
  validatePrivateEditMiddleware,
  validatePrivateViewMiddleware,
  validateUserMiddleware
} from '@main/middleware/validation';
import type { Express } from 'express';
import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const clientRouter = Router();
  const privateViewRouter = Router();
  const privateEditRouter = Router();
  const adminRouter = Router();
  const ownerRouter = Router();

  readdirSync(join(__dirname, '..', '..', 'routes', 'public')).map(async (file) =>
    (await import(`../../routes/public/${file}`)).default(publicRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'client')).map(async (file) =>
    (await import(`../../routes/client/${file}`)).default(clientRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'private-view')).map(async (file) =>
    (await import(`../../routes/private-view/${file}`)).default(privateViewRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'private-edit')).map(async (file) =>
    (await import(`../../routes/private-edit/${file}`)).default(privateEditRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'owner')).map(async (file) =>
    (await import(`../../routes/owner/${file}`)).default(ownerRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'admin')).map(async (file) =>
    (await import(`../../routes/admin/${file}`)).default(adminRouter)
  );

  app.use(api.baseUrl, langMiddleware(), publicRouter);
  app.use(api.baseUrl, langMiddleware(), validateClientMiddleware(), clientRouter);

  app.use(
    api.baseUrl,
    langMiddleware(),
    validateUserMiddleware(),
    validatePrivateViewMiddleware(),
    privateViewRouter
  );

  app.use(
    api.baseUrl,
    langMiddleware(),
    validateUserMiddleware(),
    validatePrivateEditMiddleware(),
    privateEditRouter
  );

  app.use(
    api.baseUrl,
    langMiddleware(),
    validateUserMiddleware(),
    validateOwnerMiddleware(),
    ownerRouter
  );

  app.use(
    api.baseUrl,
    langMiddleware(),
    validateUserMiddleware(),
    validateAdminMiddleware(),
    adminRouter
  );

  app.get('*', (_, res) => {
    res.send(``);
  });
};
