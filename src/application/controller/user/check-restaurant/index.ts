import type { Controller } from '@domain/protocols';
import { errorLogger, forbidden, messageErrorResponse, ok } from '@main/utils';
import { userRestaurantRepository } from '@repository/user-restaurant';
import type { Request, Response } from 'express';

interface Body {
  restaurantUrl: string;
}

/**
 * @typedef {object} CheckUserRestaurantBody
 * @property {string} restaurantUrl.required
 */

/**
 * @typedef {object} CheckUserRestaurantPayload
 * @property {boolean} canAccess.required
 */

/**
 * @typedef {object} CheckUserRestaurantResponse
 * @property {string} message
 * @property {string} status
 * @property {CheckUserRestaurantPayload} payload
 */

/**
 * POST /user/check-restaurant
 * @summary Check User Restaurant
 * @tags User
 * @security BearerAuth
 * @param {CheckUserRestaurantBody} request.body.required - application/json
 * @return {CheckUserRestaurantResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const checkUserRestaurantController: Controller =
  () =>
  async ({ lang, user, body }: Request, response: Response) => {
    try {
      const { restaurantUrl } = body as Body;

      if (typeof restaurantUrl !== 'string' || restaurantUrl.trim() === '')
        return forbidden({ lang, response });

      const findParams = ['ur.id', 'r.id', 'r.name', 'r.restaurantUrl'];

      const queryBuilder = userRestaurantRepository
        .createQueryBuilder('ur')
        .select(findParams)
        .innerJoin('ur.restaurant', 'r')
        .where('r.restaurantUrl = :restaurantUrl', { restaurantUrl })
        .andWhere('ur.userId = :userId', { userId: user.id })
        .andWhere('ur.finishedAt IS NULL')
        .andWhere('r.finishedAt IS NULL');

      const payload = await queryBuilder.getOne();

      if (!payload) return forbidden({ lang, response });

      return ok({
        payload: { canAccess: true, user: { ...user, restaurant: payload.restaurant } },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
