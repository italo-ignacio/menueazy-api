import { finishedAt } from '@application/helper';
import { clientFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import type { ClientTokenInput } from '@domain/token';
import { env } from '@main/config/env';
import { errorLogger, removeBearer, unauthorized } from '@main/utils';
import { clientRepository } from '@repository/client';
import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const validateClientMiddleware: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      if (typeof authorization === 'undefined') return unauthorized({ lang, response });

      const accessToken = removeBearer(authorization);

      if (accessToken === null) return unauthorized({ lang, response });

      const { SECRET } = env.JWT;
      const { email, firebaseId, id, isBlocked } = verify(accessToken, SECRET) as ClientTokenInput;

      if (
        typeof id === 'undefined' ||
        typeof email === 'undefined' ||
        typeof firebaseId === 'undefined' ||
        typeof isBlocked === 'undefined'
      )
        return unauthorized({ lang, response });

      const client = await clientRepository.findOne({
        select: clientFindParams,
        where: { email, id, firebaseId, isBlocked, finishedAt }
      });

      if (client === null || client.isBlocked) return unauthorized({ lang, response });

      Object.assign(request, { client });
      next();
    } catch (error) {
      errorLogger(error);

      return unauthorized({ lang, response });
    }
  };
