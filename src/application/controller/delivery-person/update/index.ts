import { updateDeliveryPersonSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { DeliveryPersonEntity } from '@entity/delivery-person';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, ok, toNumber } from '@main/utils';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  phone?: string;
}

/**
 * @typedef {object} UpdateDeliveryPersonBody
 * @property {string} name
 * @property {string} phone
 */

/**
 * PUT /restaurant/{restaurantId}/delivery-person/{id}
 * @summary Update Delivery Person
 * @tags Delivery Person
 * @security BearerAuth
 * @param {UpdateDeliveryPersonBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateDeliveryPersonController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updateDeliveryPersonSchema.validate(request, { abortEarly: false });

      const { name, phone } = request.body as Body;

      await DataSource.createQueryBuilder()
        .update(DeliveryPersonEntity)
        .set({ name, phone })
        .where('id = :id', { id: toNumber(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: restaurant.id })
        .execute();

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
