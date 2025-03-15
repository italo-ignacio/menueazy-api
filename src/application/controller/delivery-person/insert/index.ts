import { insertDeliveryPersonSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import { deliveryPersonRepository } from '@repository/delivery-person';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  phone?: string;
}

/**
 * @typedef {object} InsertDeliveryPersonBody
 * @property {string} name.required
 * @property {string} phone
 */

/**
 * POST /restaurant/{restaurantId}/delivery-person
 * @summary Insert Delivery Person
 * @tags Delivery Person
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertDeliveryPersonBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertDeliveryPersonController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await insertDeliveryPersonSchema.validate(request, { abortEarly: false });

      const { name, phone } = request.body as Body;

      await deliveryPersonRepository.insert({ phone, name, restaurantId: restaurant.id });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
