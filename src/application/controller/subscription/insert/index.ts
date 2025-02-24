import { insertSubscriptionSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse, validationErrorResponse } from '@main/utils';
import { subscriptionRepository } from '@repository/subscription';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  price: number;
  restaurantLimit: number;
  productLimit: number;
  code: string;
  planId: number;
}

/**
 * @typedef {object} InsertSubscriptionBody
 * @property {number} price.required
 * @property {number} restaurantLimit.required
 * @property {number} productLimit.required
 * @property {string} code.required
 * @property {integer} planId.required
 */

/**
 * @typedef {object} InsertSubscriptionResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /subscription
 * @summary Insert Subscription
 * @tags Subscription
 * @param {InsertSubscriptionBody} request.body.required - application/json
 * @return {InsertSubscriptionResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertSubscriptionRequestController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertSubscriptionSchema.validate(request, { abortEarly: false });

      const { code, price, productLimit, restaurantLimit, planId } = request.body as Body;

      await subscriptionRepository.insert({
        code,
        price: String(price?.toFixed(2)),
        productLimit,
        restaurantLimit,
        expiresAt: new Date(),
        plan: { id: planId }
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
