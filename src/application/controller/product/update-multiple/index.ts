import { updateMultipleProductSchema } from '@data/validation';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { ProductEntity } from '@entity/product';
import { messages } from '@i18n/index';
import { cache } from '@infra/redis';
import { badRequest, errorLogger, messageErrorResponse, ok } from '@main/utils';
import { productRepository } from '@repository/product';
import type { Request, Response } from 'express';
import { In } from 'typeorm';

interface Body {
  inStock?: boolean;
  published?: boolean;
  highlight?: boolean;
  delete?: boolean;
  ids: number[];
}

/**
 * @typedef {object} UpdateProductBody
 * @property {boolean} inStock
 * @property {boolean} published
 * @property {boolean} highlight
 * @property {boolean} delete
 * @property {Array<number>} ids
 */

/**
 * PUT /restaurant/{restaurantId}/product/multiple
 * @summary Update Multiple Product
 * @tags Product
 * @security BearerAuth
 * @param {UpdateProductBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateMultipleProductController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updateMultipleProductSchema.validate(request, { abortEarly: false });

      const { inStock, published, highlight, delete: deleteItems, ids } = request.body as Body;

      if (!Array.isArray(ids) || ids.length === 0) return badRequest({ lang, response });

      const body: Partial<ProductEntity> = {
        inStock: undefined,
        published: undefined,
        highlight: undefined,
        finishedAt: undefined
      };

      if (typeof deleteItems !== 'undefined' && deleteItems) body.finishedAt = new Date();
      else {
        if (typeof inStock !== 'undefined') body.inStock = inStock;
        if (typeof published !== 'undefined') body.published = published;
        if (typeof highlight !== 'undefined') body.highlight = highlight;
      }

      await productRepository.update({ id: In(ids), restaurantId: restaurant.id }, body);

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
