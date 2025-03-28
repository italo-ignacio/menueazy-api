import { ingredientFindParams } from '@data/search';
import type { ingredientQueryFields } from '@data/validation';
import { ingredientListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { ingredientRepository } from '@repository/ingredient';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindIngredientPayload
 * @property {array<Ingredient>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindIngredientResponse
 * @property {string} message
 * @property {string} status
 * @property {FindIngredientPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/ingredient
 * @summary Find Ingredient
 * @tags Ingredient
 * @param {integer} restaurantId.path.required
 * @param {string} name.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindIngredientResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findIngredientController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<ingredientQueryFields>({
        list: ingredientListQueryFields,
        query
      });

      Object.assign(where, { restaurantId: restaurant.id });

      const [content, totalElements] = await ingredientRepository.findAndCount({
        order,
        select: ingredientFindParams,
        skip,
        take,
        where
      });

      return ok({
        payload: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / take)
        },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
