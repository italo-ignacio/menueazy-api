import { categoryFindParams } from '@data/search';
import type { categoryQueryFields } from '@data/validation';
import { categoryListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindCategoryPayload
 * @property {array<Category>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindCategoryResponse
 * @property {string} message
 * @property {string} status
 * @property {FindCategoryPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/category
 * @summary Find Category
 * @tags Category
 * @param {integer} restaurantId.path.required
 * @param {string} name.query
 * @return {FindCategoryResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findCategoryController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { where } = getGenericFilter<categoryQueryFields>({
        list: categoryListQueryFields,
        query
      });

      Object.assign(where, { restaurantId: restaurant.id });

      const payload = await categoryRepository.find({
        order: { order: 'ASC' },
        select: categoryFindParams,
        skip,
        take,
        where
      });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
