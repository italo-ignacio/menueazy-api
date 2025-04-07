import { finishedAt } from '@application/helper';
import { updateIngredientDataSchema } from '@data/validation';
import { IngredientMovementType } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { IngredientEntity } from '@entity/ingredient';
import { IngredientMovementEntity } from '@entity/ingredient-movement';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { ingredientDataRepository } from '@repository/ingredient-data';
import type { Request, Response } from 'express';

interface Body {
  quantity?: number;
  entryQuantity?: number;
  unitPrice?: number;
  expiresAt?: Date;
}

/**
 * @typedef {object} UpdateIngredientDataBody
 * @property {number} quantity
 * @property {number} entryQuantity
 * @property {number} unitPrice
 * @property {string} expiresAt
 */

/**
 * PUT /restaurant/{restaurantId}/ingredient/{ingredientId}/data/{id}
 * @summary Update Ingredient Data
 * @tags Ingredient Data
 * @security BearerAuth
 * @param {UpdateIngredientDataBody} request.body.required
 * @param {integer} restaurantId.path.required
 * @param {integer} ingredientId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateIngredientDataController: Controller =
  () =>
  async ({ lang, restaurant, user, ...request }: Request, response: Response) => {
    let err = 0;
    try {
      await updateIngredientDataSchema.validate(request, { abortEarly: false });

      const { quantity, unitPrice, expiresAt, entryQuantity } = request.body as Body;

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
          priceInStock: true,
          totalPrice: true,
          quantity: true,
          ingredient: {
            id: true,
            quantity: true,
            priceInStock: true,
            totalPrice: true
          }
        },
        relations: { ingredient: true }
      });

      if (!ingredientData)
        return notFound({ entity: messages[lang].entity.ingredient, lang, response });

      const oldData = { ...ingredientData };

      await DataSource.transaction(async (manager) => {
        if (typeof expiresAt !== 'undefined') ingredientData.expiresAt = expiresAt;

        if (typeof unitPrice !== 'undefined') {
          ingredientData.unitPrice = unitPrice;

          if (typeof quantity === 'undefined') {
            ingredientData.priceInStock = oldData.quantity * unitPrice;
          }

          if (typeof entryQuantity === 'undefined') {
            ingredientData.entryQuantity = oldData.entryQuantity * unitPrice;
          }
        }

        if (typeof quantity !== 'undefined') {
          ingredientData.quantity = quantity;
          ingredientData.priceInStock = quantity * ingredientData.unitPrice;
        }

        if (typeof entryQuantity !== 'undefined') {
          ingredientData.entryQuantity = entryQuantity;
          ingredientData.totalPrice = entryQuantity * ingredientData.unitPrice;
        }

        if (ingredientData.quantity > ingredientData.entryQuantity) {
          err = 1;
          throw new Error();
        }

        await manager.save(ingredientData);

        await manager.insert(IngredientMovementEntity, {
          ingredient: { id: toNumber(request.params.ingredientId) },
          quantity,
          oldQuantity: oldData.quantity,
          type: IngredientMovementType.ADJUST,
          userId: user.id
        });

        let quantityValue: number | undefined = undefined;
        let priceInStockValue: number | undefined = undefined;
        let totalPriceValue: number | undefined = undefined;

        if (oldData.quantity !== ingredientData.quantity) {
          quantityValue =
            ingredientData.ingredient.quantity + ingredientData.quantity - oldData.quantity;
        }

        if (oldData.priceInStock !== ingredientData.priceInStock) {
          priceInStockValue =
            ingredientData.ingredient.priceInStock +
            ingredientData.priceInStock -
            oldData.priceInStock;
        }

        if (oldData.totalPrice !== ingredientData.totalPrice) {
          totalPriceValue =
            ingredientData.ingredient.totalPrice + ingredientData.totalPrice - oldData.totalPrice;
        }

        if (
          typeof quantityValue !== 'undefined' ||
          typeof priceInStockValue !== 'undefined' ||
          typeof totalPriceValue !== 'undefined'
        )
          await manager.update(
            IngredientEntity,
            { id: ingredientData.ingredient.id },
            {
              quantity: quantityValue,
              priceInStock: priceInStockValue,
              totalPrice: totalPriceValue
            }
          );
      });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      if (err === 1)
        badRequest({ lang, response, message: messages[lang].error.quantityBiggestThanTotal });

      return messageErrorResponse({ error, lang, response });
    }
  };
