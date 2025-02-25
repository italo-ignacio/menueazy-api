import { api } from '@domain/helpers';
import { langMiddleware } from '@main/middleware';
import {
  validateAdminMiddleware,
  validateClientMiddleware,
  validateOwnerMiddleware,
  validateUserMiddleware
} from '@main/middleware/validation';
import type { Express } from 'express';
import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const adminRouter = Router();
  const privateRouter = Router();
  const ownerRouter = Router();
  const clientRouter = Router();

  readdirSync(join(__dirname, '..', '..', 'routes', 'public')).map(async (file) =>
    (await import(`../../routes/public/${file}`)).default(publicRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'admin')).map(async (file) =>
    (await import(`../../routes/admin/${file}`)).default(adminRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'private')).map(async (file) =>
    (await import(`../../routes/private/${file}`)).default(privateRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'client')).map(async (file) =>
    (await import(`../../routes/client/${file}`)).default(clientRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'owner')).map(async (file) =>
    (await import(`../../routes/owner/${file}`)).default(ownerRouter)
  );

  app.use(api.baseUrl, langMiddleware(), publicRouter);
  app.use(api.baseUrl, langMiddleware(), validateClientMiddleware(), clientRouter);

  app.use(api.baseUrl, langMiddleware(), validateUserMiddleware(), privateRouter);

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
