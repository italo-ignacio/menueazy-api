import { insertRestaurantSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse, validationErrorResponse } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  name: string;
}

/**
 * @typedef {object} InsertRestaurantBody
 * @property {string} name.required
 */

/**
 * @typedef {object} InsertRegisterResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /restaurant
 * @summary Insert Register Request
 * @tags Register Request
 * @param {InsertRegisterBody} request.body.required - application/json
 * @return {InsertRegisterResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertRestaurantController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertRestaurantSchema.validate(request, { abortEarly: false });

      const { name } = request.body as Body;

      await restaurantRepository.insert({ name });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
