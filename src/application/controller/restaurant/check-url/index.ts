import { finishedAt } from '@application/helper';
import type { Controller } from '@domain/protocols';
import { errorLogger, forbidden, messageErrorResponse, ok } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';

interface Body {
  restaurantUrl: string;
}

/**
 * @typedef {object} CheckRestaurantUrlBody
 * @property {string} restaurantUrl.required
 */

/**
 * @typedef {object} CheckRestaurantUrlPayload
 * @property {boolean} canUseUrl.required
 */

/**
 * @typedef {object} CheckRestaurantUrlResponse
 * @property {string} message
 * @property {string} status
 * @property {CheckRestaurantUrlPayload} payload
 */

/**
 * POST /restaurant/check-url
 * @summary Check Restaurant Url
 * @tags Restaurant
 * @security BearerAuth
 * @param {CheckRestaurantUrlBody} request.body.required - application/json
 * @return {CheckRestaurantUrlResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const checkRestaurantUrlController: Controller =
  () =>
  async ({ lang, body }: Request, response: Response) => {
    try {
      const { restaurantUrl } = body as Body;

      if (typeof restaurantUrl !== 'string') return forbidden({ lang, response });

      const restaurant = await restaurantRepository.findOne({
        select: { id: true },
        where: { restaurantUrl, finishedAt }
      });

      return ok({ payload: { canUseUrl: restaurant === null }, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
