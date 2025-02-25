import { userFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import type { UserTokenInput } from '@domain/token';
import { env } from '@main/config/env';
import { errorLogger, removeBearer, unauthorized } from '@main/utils';
import { userRepository } from '@repository/user';
import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IsNull } from 'typeorm';

export const validateClientMiddleware: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      if (typeof authorization === 'undefined') return unauthorized({ lang, response });

      const accessToken = removeBearer(authorization);

      if (accessToken === null) return unauthorized({ lang, response });

      const { SECRET } = env.JWT;
      const {
        user: { companyId, email, firebaseId, id, role }
      } = verify(accessToken, SECRET) as { user: UserTokenInput };

      if (typeof id === 'undefined' || typeof email === 'undefined' || typeof role === 'undefined')
        return unauthorized({ lang, response });

      const user = await userRepository.findOne({
        select: {
          ...userFindParams,
          company: {
            id: true,
            name: true,
            companyUrl: true
          }
        },
        relations: { company: true },
        where: { email, firebaseId, id, role, company: { id: companyId }, finishedAt: IsNull() }
      });

      if (user === null) return unauthorized({ lang, response });

      Object.assign(request, { user });
      next();
    } catch (error) {
      errorLogger(error);

      return unauthorized({ lang, response });
    }
  };
