import { insertTableSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import { tableRepository } from '@repository/table';
import type { Request, Response } from 'express';

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
 * POST /restaurant/{restaurantId}/table
 * @summary Insert Table
 * @tags Table
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertTableBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertTableController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await insertTableSchema.validate(request, { abortEarly: false });

      const { name, description } = request.body as Body;

      await tableRepository.insert({ description, name, restaurantId: restaurant.id });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
