import { finishedAt } from '@application/helper';
import type { Controller } from '@domain/protocols';
import { IngredientEntity } from '@entity/ingredient';
import { IngredientDataEntity } from '@entity/ingredient-data';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, notFound, ok, toNumber } from '@main/utils';
import { ingredientDataRepository } from '@repository/ingredient-data';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}/ingredient/{ingredientId}/data/{id}
 * @summary Delete Ingredient
 * @tags Ingredient
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} ingredientId.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteIngredientDataController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const ingredientData = await ingredientDataRepository.findOne({
        where: {
          id: toNumber(request.params.id),
          ingredient: {
            id: toNumber(request.params.ingredientId),
            restaurantId: restaurant.id,
            finishedAt
          },
          finishedAt
        },
        select: {
          id: true,
          entryQuantity: true,
          expiresAt: true,
          unitPrice: true,
          totalPrice: true,
          priceInStock: true,
          quantity: true,
          ingredient: {
            id: true,
            quantity: true,
            totalPrice: true,
            priceInStock: true
          }
        },
        relations: { ingredient: true }
      });

      if (!ingredientData)
        return notFound({ entity: messages[lang].entity.ingredient, lang, response });

      await DataSource.transaction(async (manager) => {
        await manager.update(
          IngredientDataEntity,
          { id: ingredientData.id },
          { finishedAt: new Date() }
        );

        await manager.update(
          IngredientEntity,
          { id: ingredientData.ingredient.id },
          {
            quantity: ingredientData.ingredient.quantity - ingredientData.quantity,
            totalPrice: ingredientData.ingredient.totalPrice - ingredientData.totalPrice,
            priceInStock: ingredientData.ingredient.priceInStock - ingredientData.priceInStock
          }
        );
      });

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
