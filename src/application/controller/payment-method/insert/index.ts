import { insertPaymentMethodSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import { paymentMethodRepository } from '@repository/payment-method';
import type { Request, Response } from 'express';

interface Body {
  paymentMethods: {
    title: string;
    description?: string;
    logoUrl?: string;
  }[];
}

/**
 * @typedef {object} InsertPaymentMethodListBody
 * @property {string} title.required
 * @property {string} description
 * @property {string} logoUrl
 */

/**
 * @typedef {object} InsertPaymentMethodBody
 * @property {array<InsertPaymentMethodListBody>} paymentMethods.required
 */

/**
 * POST /restaurant/{restaurantId}/payment-method
 * @summary Insert Payment Method
 * @tags Payment Method
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertPaymentMethodBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertPaymentMethodController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await insertPaymentMethodSchema.validate(request, { abortEarly: false });

      const { paymentMethods } = request.body as Body;

      const data = paymentMethods.map((item) => ({
        description: item.description,
        logoUrl: item.logoUrl,
        title: item.title,
        restaurantId: restaurant.id
      }));

      await paymentMethodRepository.insert(data);

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
