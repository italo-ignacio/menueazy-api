import { finishedAt } from '@application/helper';
import { categoryFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneCategoryResponse
 * @property {string} message
 * @property {string} status
 * @property {Category} payload
 */

/**
 * GET /restaurant/{restaurantId}/category/{id}
 * @summary Find One Category
 * @tags Category
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {FindOneCategoryResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneCategoryController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const payload = await categoryRepository.findOne({
        select: categoryFindParams,
        where: { id: Number(request.params.id), restaurantId: restaurant.id, finishedAt }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.category, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
