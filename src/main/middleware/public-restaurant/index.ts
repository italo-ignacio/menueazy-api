import type { Controller } from '@domain/protocols';
import { badRequest, errorLogger } from '@main/utils';
import type { NextFunction, Request, Response } from 'express';

export const publicRestaurantMiddleware: Controller =
  () => async (request: Request, response: Response, next: NextFunction) => {
    try {
      const restaurantId = request.params.restaurantId;
      let id = Number(restaurantId);

      if (isNaN(id)) id = 0;

      Object.assign(request, { restaurant: { id } });
      next();
    } catch (error) {
      errorLogger(error);

      return badRequest({ lang: request.lang, response });
    }
  };
