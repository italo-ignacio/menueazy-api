import { updateProductSchema } from '@data/validation';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { ProductEntity } from '@entity/product';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { cache } from '@infra/redis';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  description?: string;
}

/**
 * @typedef {object} UpdateProductBody
 * @property {string} name
 * @property {string} description
 */

/**
 * PUT /restaurant/{restaurantId}/product/{id}
 * @summary Update Product
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
export const updateProductController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updateProductSchema.validate(request, { abortEarly: false });

      const { name, description } = request.body as Body;

      await DataSource.createQueryBuilder()
        .update(ProductEntity)
        .set({ name, description })
        .where('id = :id', { id: Number(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: restaurant.id })
        .execute();

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
