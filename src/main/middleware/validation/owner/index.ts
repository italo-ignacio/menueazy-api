import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { forbidden } from '@main/utils';
import type { NextFunction, Request, Response } from 'express';

export const validateOwnerMiddleware: Controller =
  () =>
  async ({ user, lang }: Request, response: Response, next: NextFunction) => {
    if ([Role.OWNER, Role.ADMIN].includes(user.role)) next();

    return forbidden({ lang, response });
  };
