import { insertRestaurantSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse, validationErrorResponse } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  name: string;
  phone: string;
  restaurantUrl: string;
  hasDelivery: boolean;
  minimumOrderPrice: number;
  styleId: number;
  contactLink?: string;
  description?: string;
  maxDeliveryDistanceInKm?: number;
  minimumDeliveryPrice?: number;
  priceByKmInDelivery?: number;
}

/**
 * @typedef {object} InsertRestaurantBody
 * @property {string} name.required
 * @property {string} phone.required
 * @property {string} restaurantUrl.required
 * @property {boolean} hasDelivery.required
 * @property {number} minimumOrderPrice.required
 * @property {integer} styleId.required
 * @property {string} contactLink
 * @property {string} description
 * @property {number} maxDeliveryDistanceInKm
 * @property {number} minimumDeliveryPrice
 * @property {number} priceByKmInDelivery
 */

/**
 * @typedef {object} InsertRestaurantResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /restaurant
 * @summary Insert Restaurant
 * @tags Restaurant
 * @security BearerAuth
 * @param {InsertRestaurantBody} request.body.required - application/json
 * @return {InsertRestaurantResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertRestaurantController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertRestaurantSchema.validate(request, { abortEarly: false });

      const {
        name,
        hasDelivery,
        minimumOrderPrice,
        phone,
        restaurantUrl,
        styleId,
        contactLink,
        description,
        maxDeliveryDistanceInKm,
        minimumDeliveryPrice,
        priceByKmInDelivery
      } = request.body as Body;

      await restaurantRepository.insert({
        name,
        company: { id: request.user.company.id },
        contactLink,
        description,
        hasDelivery,
        maxDeliveryDistanceInKm,
        minimumDeliveryPrice,
        minimumOrderPrice,
        open: false,
        phone,
        priceByKmInDelivery,
        restaurantUrl,
        style: { id: styleId }
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
