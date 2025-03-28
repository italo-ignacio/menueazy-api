import { finishedAt } from '@application/helper';
import { insertProductIngredientSchema } from '@data/validation';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { cache } from '@infra/redis';
import { created, errorLogger, messageErrorResponse, notFound, toNumber } from '@main/utils';
import { ingredientRepository } from '@repository/ingredient';
import { productRepository } from '@repository/product';
import { productIngredientRepository } from '@repository/product-ingredient';
import type { Request, Response } from 'express';

interface Body {
  quantity: number;
  additionalPrice?: number;
  canAdd?: boolean;
  canRemove?: boolean;
  maxAddQuantity?: number;
}

/**
 * @typedef {object} InsertProductIngredientResponsePayload
 * @property {number} quantity.required
 * @property {number} additionalPrice
 * @property {boolean} canAdd
 * @property {boolean} canRemove
 * @property {number} maxAddQuantity
 */

/**
 * @typedef {object} InsertProductIngredientResponse
 * @property {string} message
 * @property {string} status
 * @property {InsertProductIngredientResponsePayload} payload
 */

/**
 * POST /restaurant/{restaurantId}/product/{productId}/ingredient/{id}
 * @summary Insert Product Ingredient
 * @tags Product
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} productId.path.required
 * @param {integer} id.path.required
 * @return {InsertProductIngredientResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertProductIngredientController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await insertProductIngredientSchema.validate(request, { abortEarly: false });

      const { quantity, additionalPrice, canAdd, canRemove, maxAddQuantity } = request.body as Body;

      const ingredient = await ingredientRepository.findOne({
        select: { id: true },
        where: {
          id: toNumber(request.params.id),
          restaurantId: toNumber(restaurant.id),
          finishedAt
        }
      });

      const product = await productRepository.findOne({
        select: { id: true },
        where: {
          id: toNumber(request.params.productId),
          restaurantId: toNumber(restaurant.id),
          finishedAt
        }
      });

      if (!ingredient)
        return notFound({ entity: messages[lang].entity.ingredient, lang, response });
      if (!product) return notFound({ entity: messages[lang].entity.product, lang, response });

      await productIngredientRepository.insert({
        quantity,
        additionalPrice,
        ingredient,
        product,
        canAdd,
        canRemove,
        maxAddQuantity
      });

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
