import { finishedAt } from '@application/helper';
import { insertCategorySchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, created, errorLogger, messageErrorResponse } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';

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

      const count = await categoryRepository.count({
        where: { finishedAt, restaurantId: restaurant.id }
      });

      if (count >= 20)
        return badRequest({ lang, response, message: `${messages[lang].error.maxCategories} 20` });

      await categoryRepository.insert({
        description,
        order: count + 1,
        name,
        restaurantId: restaurant.id
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
