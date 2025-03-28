import { finishedAt } from '@application/helper';
import { ingredientFindParams, productIngredientFindParams } from '@data/search';
import type { productIngredientQueryFields } from '@data/validation';
import { productIngredientListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok,
  toNumber
} from '@main/utils';
import { productIngredientRepository } from '@repository/product-ingredient';
import { request, type Request, type Response } from 'express';

/**
 * @typedef {object} FindProductIngredientPayload
 * @property {array<ProductIngredient>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindProductIngredientResponse
 * @property {string} message
 * @property {string} status
 * @property {FindProductIngredientPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/product/{id}/ingredient
 * @summary Find Product Ingredient
 * @tags Product
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @param {string} name.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindProductIngredientResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findProductIngredientController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<productIngredientQueryFields>({
        list: productIngredientListQueryFields,
        query
      });

      Object.assign(where, {
        product: { id: toNumber(request.params.id), restaurantId: restaurant.id, finishedAt }
      });

      const [content, totalElements] = await productIngredientRepository.findAndCount({
        order,
        select: { ...productIngredientFindParams, ingredient: ingredientFindParams },
        skip,
        relations: { ingredient: true },
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
