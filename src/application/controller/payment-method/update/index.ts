import { updatePaymentMethodSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { PaymentMethodEntity } from '@entity/payment-method';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import type { Request, Response } from 'express';

interface Body {
  title: string;
  description?: string;
  logoUrl?: string;
}

/**
 * @typedef {object} UpdatePaymentMethodBody
 * @property {string} title.required
 * @property {string} description
 * @property {string} logoUrl
 */

/**
 * PUT /restaurant/{restaurantId}/payment-method/{id}
 * @summary Update Payment Method
 * @tags Payment Method
 * @security BearerAuth
 * @param {UpdatePaymentMethodBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updatePaymentMethodController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updatePaymentMethodSchema.validate(request, { abortEarly: false });

      const { title, description, logoUrl } = request.body as Body;

      await DataSource.createQueryBuilder()
        .update(PaymentMethodEntity)
        .set({ title, description, logoUrl })
        .where('id = :id', { id: Number(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: restaurant.id })
        .execute();

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
