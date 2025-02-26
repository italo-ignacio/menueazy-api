import { insertPaymentMethodSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse, validationErrorResponse } from '@main/utils';
import { paymentMethodRepository } from '@repository/payment-method';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

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
 * @typedef {object} InsertPaymentMethodResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /restaurant/{restaurantUrl}/payment-method
 * @summary Insert Payment Method
 * @tags Payment Method
 * @security BearerAuth
 * @param {string} restaurantUrl.path.required
 * @param {InsertPaymentMethodBody} request.body.required - application/json
 * @return {InsertPaymentMethodResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertPaymentMethodController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertPaymentMethodSchema.validate(request, { abortEarly: false });

      const { paymentMethods } = request.body as Body;

      const data = paymentMethods.map((item) => ({
        description: item.description,
        logoUrl: item.description,
        title: item.description,
        restaurant: { id: request.restaurant.id }
      }));

      await paymentMethodRepository.insert(data);

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
