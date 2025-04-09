import { finishedAt } from '@application/helper';
import { updateProductIngredientSchema } from '@data/validation';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { cache } from '@infra/redis';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { productIngredientRepository } from '@repository/product-ingredient';
import type { Request, Response } from 'express';

interface Body {
  quantity?: number;
  additionalPrice?: number;
  canAdd?: boolean;
  canRemove?: boolean;
  maxAddQuantity?: number;
}

/**
 * @typedef {object} UpdateProductIngredientBody
 * @property {number} quantity
 * @property {number} additionalPrice
 * @property {boolean} canAdd
 * @property {boolean} canRemove
 * @property {number} maxAddQuantity
 */

/**
 * PUT /restaurant/{restaurantId}/product/{productId}/ingredient/{id}
 * @summary Update Product Ingredient
 * @tags Product Ingredient
 * @security BearerAuth
 * @param {UpdateProductIngredientBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} productId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateProductIngredientController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updateProductIngredientSchema.validate(request, { abortEarly: false });

      const { additionalPrice, canAdd, canRemove, maxAddQuantity, quantity } = request.body as Body;

      const productIngredient = await productIngredientRepository.update(
        {
          ingredientId: toNumber(request.params.id),
          product: {
            id: toNumber(request.params.productId),
            restaurantId: toNumber(restaurant.id)
          },
          finishedAt
        },
        {
          additionalPrice,
          canAdd,
          canRemove,
          maxAddQuantity,
          quantity
        }
      );

      if (!productIngredient)
        return notFound({ entity: messages[lang].entity.productIngredient, lang, response });

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
