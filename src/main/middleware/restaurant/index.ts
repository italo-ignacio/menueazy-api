import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, notFound } from '@main/utils';
import { userRestaurantRepository } from '@repository/user-restaurant';
import type { NextFunction, Request, Response } from 'express';

export const restaurantMiddleware: Controller =
  () => async (request: Request, response: Response, next: NextFunction) => {
    try {
      const restaurantId = request.params.restaurantId;

      let id = Number(restaurantId);

      if (isNaN(id)) id = 0;
      else {
        const userRestaurant = await userRestaurantRepository.findOne({
          select: { restaurantId: true },
          where: { restaurantId: Number(restaurantId), userId: request.user.id }
        });

        if (userRestaurant === null)
          return notFound({
            entity: messages[request.lang].entity.restaurant,
            lang: request.lang,
            response
          });

        id = userRestaurant.restaurantId;
      }

      Object.assign(request, { restaurant: { id } });
      next();
    } catch (error) {
      errorLogger(error);

      return badRequest({ lang: request.lang, response });
    }
  };
