import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { forbidden } from '@main/utils';
import type { NextFunction, Request, Response } from 'express';

export const validateRoleMiddleware: Controller =
  (data: Role[]) =>
  async ({ user, lang }: Request, response: Response, next: NextFunction) => {
    if (data.includes(user.role)) return next();

    return forbidden({ lang, response });
  };
