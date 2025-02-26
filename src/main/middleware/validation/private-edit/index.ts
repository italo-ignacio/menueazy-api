import type { Controller } from '@domain/protocols';
import type { NextFunction, Request, Response } from 'express';

export const validatePrivateEditMiddleware: Controller =
  () => async (request: Request, response: Response, next: NextFunction) => {
    const { RestaurantUrl } = request.headers;

    Object.assign(request, { restaurantUrl: RestaurantUrl });

    next();
  };
