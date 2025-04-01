import { finishedAt } from '@application/helper';
import { updateIngredientDataSchema } from '@data/validation';
import { IngredientMovementType } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { IngredientMovementEntity } from '@entity/ingredient-movement';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
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
        }
      });

      if (!ingredientData)
        return notFound({ entity: messages[lang].entity.ingredient, lang, response });

      const oldData = { ...ingredientData };

      await DataSource.transaction(async (manager) => {
        if (typeof quantity !== 'undefined') ingredientData.quantity = quantity;
        if (typeof unitPrice !== 'undefined') ingredientData.unitPrice = unitPrice;
        if (typeof expiresAt !== 'undefined') ingredientData.expiresAt = expiresAt;
        if (typeof entryQuantity !== 'undefined') ingredientData.entryQuantity = entryQuantity;

        await manager.save(ingredientData);

        await manager.insert(IngredientMovementEntity, {
          ingredient: { id: toNumber(request.params.ingredientId) },
          quantity,
          oldQuantity: oldData.quantity,
          type: IngredientMovementType.ADJUST,
          userId: user.id
        });
      });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
