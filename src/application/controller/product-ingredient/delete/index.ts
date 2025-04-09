import { finishedAt } from '@application/helper';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { cache } from '@infra/redis';
import { badRequest, errorLogger, notFound, ok, toNumber } from '@main/utils';
import { productIngredientRepository } from '@repository/product-ingredient';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}/product/{productId}/ingredient/{id}
 * @summary Delete Product Ingredient
 * @tags Product Ingredient
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} productId.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteProductController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const productIngredient = await productIngredientRepository.findOne({
        select: { id: true, finishedAt: true },
        where: {
          ingredientId: toNumber(request.params.id),
          product: {
            id: toNumber(request.params.productId),
            restaurantId: toNumber(restaurant.id)
          },
          finishedAt
        }
      });

      if (!productIngredient)
        return notFound({ entity: messages[lang].entity.productIngredient, lang, response });

      productIngredient.finishedAt = new Date();

      productIngredientRepository.save(productIngredient);

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
