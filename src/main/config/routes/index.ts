import { getRoles, Role } from '@domain/enum';
import { api } from '@domain/helpers';
import { langMiddleware, publicRestaurantMiddleware, restaurantMiddleware } from '@main/middleware';
import {
  validateClientMiddleware,
  validateRoleMiddleware,
  validateUserMiddleware
} from '@main/middleware/validation';
import type { Express } from 'express';
import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const clientRouter = Router();

  const employeeRouter = Router();
  const supervisorRouter = Router();
  const managerRouter = Router();
  const ownerRouter = Router();
  const adminRouter = Router();

  readdirSync(join(__dirname, '..', '..', 'routes', 'public')).forEach(async (file) => {
    (await import(`../../routes/public/${file}`)).default(publicRouter);
  });

  readdirSync(join(__dirname, '..', '..', 'routes', 'client')).forEach(async (file) =>
    (await import(`../../routes/client/${file}`)).default(clientRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'employee')).forEach(async (file) =>
    (await import(`../../routes/employee/${file}`)).default(employeeRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'supervisor')).forEach(async (file) =>
    (await import(`../../routes/supervisor/${file}`)).default(supervisorRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'manager')).forEach(async (file) =>
    (await import(`../../routes/manager/${file}`)).default(managerRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'owner')).forEach(async (file) =>
    (await import(`../../routes/owner/${file}`)).default(ownerRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'admin')).forEach(async (file) =>
    (await import(`../../routes/admin/${file}`)).default(adminRouter)
  );

  app.use(langMiddleware());

  app.use(`${api.baseUrl}/restaurant/:restaurantId`, publicRestaurantMiddleware());
  app.use(api.baseUrl, publicRouter);
  app.use(`${api.baseUrl}/client`, validateClientMiddleware(), clientRouter);

  app.use(api.baseUrl, validateUserMiddleware());
  app.use(`${api.baseUrl}/restaurant/:restaurantId`, restaurantMiddleware());
  app.use(api.baseUrl, employeeRouter);
  app.use(api.baseUrl, validateRoleMiddleware(getRoles[Role.SUPERVISOR]), supervisorRouter);
  app.use(api.baseUrl, validateRoleMiddleware(getRoles[Role.MANAGER]), managerRouter);
  app.use(api.baseUrl, validateRoleMiddleware(getRoles[Role.OWNER]), ownerRouter);
  app.use(api.baseUrl, validateRoleMiddleware(getRoles[Role.ADMIN]), adminRouter);

  app.get('*', (req, res) => {
    res.json({
      message: 'Api running successfully (◡‿◡)'
    });
  });
};
