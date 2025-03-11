import { finishedAt } from '@application/helper';
import { productFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, getPagination, messageErrorResponse, notFound, ok } from '@main/utils';
import { productRepository } from '@repository/product';
import { type Request, type Response } from 'express';

/**
 * @typedef {object} FindProductPayload
 * @property {array<Product>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindProductResponse
 * @property {string} message
 * @property {string} status
 * @property {FindProductPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/product/category/{id}
 * @summary Find Product By Category
 * @tags Product
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @param {integer} page.query
 * @param {integer} limit.query
 * @return {FindProductResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findProductByCategoryController: Controller =
  () =>
  async ({ query, lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      if (isNaN(Number(request.params.id)))
        return notFound({ entity: messages[lang].entity.category, lang, response });

      const [content, totalElements] = await productRepository.findAndCount({
        order: { createdAt: 'desc' },
        select: productFindParams,
        skip,
        take,
        where: {
          restaurantId: restaurant.id,
          finishedAt,
          productCategoryList: { categoryId: Number(request.params.id) }
        }
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
