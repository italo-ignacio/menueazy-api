import { insertCategorySchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse, validationErrorResponse } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  name: string;
  description?: string;
}

/**
 * @typedef {object} InsertCategoryBody
 * @property {string} name.required
 * @property {string} description
 */

/**
 * @typedef {object} InsertCategoryResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /restaurant/{restaurantId}/category
 * @summary Insert Category
 * @tags Category
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertCategoryBody} request.body.required - application/json
 * @return {InsertCategoryResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertCategoryController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await insertCategorySchema.validate(request, { abortEarly: false });

      const { name, description } = request.body as Body;

      await categoryRepository.insert({ description, name, restaurantId: restaurant.id });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
