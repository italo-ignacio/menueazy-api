import { updateRestaurantSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  phone?: string;
  restaurantUrl?: string;
  hasDelivery?: boolean;
  minimumOrderPrice?: number;
  styleId?: number;
  contactLink?: string;
  description?: string;
  maxDeliveryDistanceInKm?: number;
  minimumDeliveryPrice?: number;
  priceByKmInDelivery?: number;
}

/**
 * @typedef {object} UpdateRestaurantBody
 * @property {string} name
 * @property {string} phone
 * @property {string} restaurantUrl
 * @property {boolean} hasDelivery
 * @property {number} minimumOrderPrice
 * @property {integer} styleId
 * @property {string} contactLink
 * @property {string} description
 * @property {number} maxDeliveryDistanceInKm
 * @property {number} minimumDeliveryPrice
 * @property {number} priceByKmInDelivery
 */

/**
 * PUT /restaurant/{restaurantId}
 * @summary Update Restaurant
 * @tags Restaurant
 * @security BearerAuth
 * @param {UpdateRestaurantBody} request.body
 * @param {integer} restaurantId.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateRestaurantController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updateRestaurantSchema.validate(request, { abortEarly: false });

      const {
        name,
        contactLink,
        description,
        hasDelivery,
        maxDeliveryDistanceInKm,
        minimumDeliveryPrice,
        minimumOrderPrice,
        phone,
        priceByKmInDelivery,
        restaurantUrl,
        styleId
      } = request.body as Body;

      await restaurantRepository.update(
        { id: restaurant.id },
        {
          name,
          contactLink,
          description,
          hasDelivery,
          maxDeliveryDistanceInKm,
          minimumDeliveryPrice,
          minimumOrderPrice,
          phone,
          priceByKmInDelivery,
          restaurantUrl,
          style: { id: styleId }
        }
      );

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
