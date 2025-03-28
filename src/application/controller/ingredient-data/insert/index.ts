import { finishedAt } from '@application/helper';
import { insertIngredientDataSchema } from '@data/validation';
import { IngredientMovementType } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { IngredientDataEntity } from '@entity/ingredient-data';
import { IngredientMovementEntity } from '@entity/ingredient-movement';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { created, errorLogger, messageErrorResponse, notFound, toNumber } from '@main/utils';
import { ingredientRepository } from '@repository/ingredient';
import type { Request, Response } from 'express';

interface Body {
  quantity: number;
  unitPrice: number;
  expiresAt?: Date;
}

/**
 * @typedef {object} InsertIngredientDataBody
 * @property {number} quantity.required
 * @property {number} unitPrice.required
 * @property {string} expiresAt
 */

/**
 * POST /restaurant/{restaurantId}/ingredient/{id}/data
 * @summary Insert Ingredient Data
 * @tags Ingredient Data
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertIngredientDataBody} request.body.required
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertIngredientDataController: Controller =
  () =>
  async ({ lang, restaurant, user, ...request }: Request, response: Response) => {
    try {
      await insertIngredientDataSchema.validate(request, { abortEarly: false });

      const { quantity, unitPrice, expiresAt } = request.body as Body;

      const ingredient = await ingredientRepository.findOne({
        select: { id: true },
        where: { id: toNumber(request.params.id), finishedAt, restaurantId: restaurant.id }
      });

      if (!ingredient)
        return notFound({ entity: messages[lang].entity.ingredient, lang, response });

      await DataSource.transaction(async (manager) => {
        await manager.insert(IngredientDataEntity, {
          entryQuantity: quantity,
          expiresAt,
          ingredient,
          quantity,
          unitPrice
        });

        await manager.insert(IngredientMovementEntity, {
          ingredient,
          quantity,
          type: IngredientMovementType.INPUT,
          userId: user.id
        });
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
