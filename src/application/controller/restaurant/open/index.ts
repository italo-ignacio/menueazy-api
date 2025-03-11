import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, messageErrorResponse, ok } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';

interface Body {
  open?: boolean;
  openForDelivery?: boolean;
}

/**
 * @typedef {object} UpdateRestaurantBody
 * @property {boolean} open
 * @property {boolean} openForDelivery
 */

/**
 * PATCH /restaurant/{restaurantId}/open
 * @summary Open/Close Restaurant
 * @tags Restaurant
 * @security BearerAuth
 * @param {UpdateRestaurantBody} request.body
 * @param {integer} restaurantId.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const openRestaurantController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const { open, openForDelivery } = request.body as Body;

      if (
        (typeof open !== 'undefined' && typeof open !== 'boolean') ||
        (typeof openForDelivery !== 'undefined' && typeof openForDelivery !== 'boolean')
      )
        return badRequest({
          message: messages[lang].error.validationErrorResponse,
          lang,
          response
        });

      await restaurantRepository.update({ id: restaurant.id }, { open, openForDelivery });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
