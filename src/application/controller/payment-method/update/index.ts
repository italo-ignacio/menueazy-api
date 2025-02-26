import { updatePaymentMethodSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { PaymentMethodEntity } from '@entity/payment-method';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

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
 * PUT /restaurant/{restaurantUrl}/payment-method/{id}
 * @summary Update Payment Method
 * @tags Payment Method
 * @security BearerAuth
 * @param {UpdatePaymentMethodBody} request.body
 * @param {string} restaurantUrl.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updatePaymentMethodController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await updatePaymentMethodSchema.validate(request, { abortEarly: false });

      const { title, description, logoUrl } = request.body as Body;

      await DataSource.createQueryBuilder()
        .update(PaymentMethodEntity)
        .set({ title, description, logoUrl })
        .where('id = :id', { id: Number(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: request.restaurant.id })
        .execute();

      return ok({ payload: messages.default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
