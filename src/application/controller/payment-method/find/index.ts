import { finishedAt } from '@application/helper';
import { paymentMethodFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import { paymentMethodRepository } from '@repository/payment-method';
import { type Request, type Response } from 'express';

/**
 * @typedef {object} FindPaymentMethodResponse
 * @property {string} message
 * @property {string} status
 * @property {array<PaymentMethod>} payload
 */

/**
 * GET /restaurant/{restaurantId}/payment-method
 * @summary Find Payment Method
 * @tags Payment Method
 * @param {integer} restaurantId.path.required
 * @return {FindPaymentMethodResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findPaymentMethodController: Controller =
  () =>
  async ({ lang, restaurant }: Request, response: Response) => {
    try {
      const payload = await paymentMethodRepository.find({
        select: paymentMethodFindParams,
        where: { restaurantId: restaurant.id, finishedAt }
      });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
