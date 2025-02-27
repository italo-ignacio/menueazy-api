import { insertTableSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse, validationErrorResponse } from '@main/utils';
import { tableRepository } from '@repository/table';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  name: string;
  description?: string;
}

/**
 * @typedef {object} InsertTableBody
 * @property {string} name.required
 * @property {string} description
 */

/**
 * @typedef {object} InsertTableResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /restaurant/{restaurantUrl}/table
 * @summary Insert Table
 * @tags Table
 * @security BearerAuth
 * @param {InsertTableBody} request.body.required - application/json
 * @return {InsertTableResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertTableController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertTableSchema.validate(request, { abortEarly: false });

      const { name, description } = request.body as Body;

      await tableRepository.insert({ description, name, restaurantId: request.restaurant.id });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
