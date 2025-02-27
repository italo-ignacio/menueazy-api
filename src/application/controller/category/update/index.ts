import { updateCategorySchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { CategoryEntity } from '@entity/category';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  name?: string;
  description?: string;
}

/**
 * @typedef {object} UpdateCategoryBody
 * @property {string} name
 * @property {string} description
 */

/**
 * PUT /restaurant/{restaurantUrl}/category/{id}
 * @summary Update Category
 * @tags Category
 * @security BearerAuth
 * @param {UpdateCategoryBody} request.body
 * @param {string} restaurantUrl.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateCategoryController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await updateCategorySchema.validate(request, { abortEarly: false });

      const { name, description } = request.body as Body;

      await DataSource.createQueryBuilder()
        .update(CategoryEntity)
        .set({ name, description })
        .where('id = :id', { id: Number(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: request.restaurant.id })
        .execute();

      return ok({ payload: messages.default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
