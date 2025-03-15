import { insertSubscriptionSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import { subscriptionRepository } from '@repository/subscription';
import type { Request, Response } from 'express';

interface Body {
  price: number;
  restaurantLimit: number;
  productLimit: number;
  planId: number;
}

/**
 * @typedef {object} InsertSubscriptionBody
 * @property {number} price.required
 * @property {number} restaurantLimit.required
 * @property {number} productLimit.required
 * @property {integer} planId.required
 */

/**
 * POST /subscription
 * @summary Insert Subscription
 * @tags Subscription
 * @security BearerAuth
 * @param {InsertSubscriptionBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertSubscriptionRequestController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertSubscriptionSchema.validate(request, { abortEarly: false });

      const { price, productLimit, restaurantLimit, planId } = request.body as Body;

      await subscriptionRepository.insert({
        price,
        productLimit,
        restaurantLimit,
        expiresAt: new Date(),
        plan: { id: planId }
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
