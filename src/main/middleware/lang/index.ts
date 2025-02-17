import type { Controller } from '@domain/protocols';
import type { NextFunction, Request, Response } from 'express';

export const langMiddleware: Controller =
  () => async (request: Request, response: Response, next: NextFunction) => {
    const { Lang } = request.headers;

    Object.assign(request, { ...request, lang: Lang ?? 'en' });
    next();
  };
