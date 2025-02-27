import { restaurantFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';
import { IsNull } from 'typeorm';

/**
 * @typedef {object} FindOneRestaurantResponse
 * @property {string} message
 * @property {string} status
 * @property {Restaurant} payload
 */

/**
 * GET /restaurant/{restaurantUrl}/url
 * @summary Find Restaurant by URL
 * @tags Restaurant
 * @param {string} restaurantUrl.path.required
 * @return {FindOneRestaurantResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findRestaurantByURLController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const payload = await restaurantRepository.findOne({
        select: restaurantFindParams,
        where: { restaurantUrl: request.params.restaurantUrl, finishedAt: IsNull() }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.restaurant, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
