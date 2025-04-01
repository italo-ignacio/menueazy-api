import { finishedAt } from '@application/helper';
import { ingredientDataFindParams } from '@data/search';
import type { ingredientDataQueryFields } from '@data/validation';
import { ingredientDataListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok,
  toNumber
} from '@main/utils';
import { ingredientDataRepository } from '@repository/ingredient-data';
import { request, type Request, type Response } from 'express';

/**
 * @typedef {object} FindIngredientDataPayload
 * @property {array<IngredientData>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindIngredientDataResponse
 * @property {string} message
 * @property {string} status
 * @property {FindIngredientDataPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/ingredient/{ingredientId}/data
 * @summary Find Ingredient Data
 * @tags Ingredient Data
 * @param {integer} restaurantId.path.required
 * @param {integer} ingredientId.path.required
 * @param {string} name.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindIngredientDataResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findIngredientDataController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<ingredientDataQueryFields>({
        list: ingredientDataListQueryFields,
        query
      });

      Object.assign(where, {
        ingredient: {
          id: toNumber(request.params.ingredientId),
          restaurantId: restaurant.id,
          finishedAt
        }
      });

      const [content, totalElements] = await ingredientDataRepository.findAndCount({
        order,
        select: ingredientDataFindParams,
        skip,
        take,
        where
      });

      return ok({
        payload: { content, totalElements, totalPages: Math.ceil(totalElements / take) },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
