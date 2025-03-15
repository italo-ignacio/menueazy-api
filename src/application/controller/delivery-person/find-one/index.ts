import { finishedAt } from '@application/helper';
import { deliveryPersonFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { deliveryPersonRepository } from '@repository/delivery-person';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneDeliveryPersonResponse
 * @property {string} message
 * @property {string} status
 * @property {DeliveryPerson} payload
 */

/**
 * GET /restaurant/{restaurantId}/delivery-person/{id}
 * @summary Find One Delivery Person
 * @tags Delivery Person
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {FindOneDeliveryPersonResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneDeliveryPersonController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const payload = await deliveryPersonRepository.findOne({
        select: deliveryPersonFindParams,
        where: { id: toNumber(request.params.id), restaurantId: restaurant.id, finishedAt }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.deliveryPerson, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
