import { finishedAt } from '@application/helper';
import { ingredientFindParams } from '@data/search';
import { updateIngredientSchema } from '@data/validation';
import { IngredientMeasure } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { IngredientEntity } from '@entity/ingredient';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import {
  deleteFiles,
  errorLogger,
  messageErrorResponse,
  notFound,
  ok,
  toNumber
} from '@main/utils';
import { ingredientRepository } from '@repository/ingredient';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  measure?: IngredientMeasure;
  minAlert?: number;
  images?: string[];
}

/**
 * @typedef {object} UpdateIngredientBody
 * @property {string} name
 * @property {string} measure - enum:GRAM,KILOGRAM,MILLILITER,LITER,UNIT
 * @property {number} minAlert
 * @property {string} images - Ingredient image - binary
 */

/**
 * PUT /restaurant/{restaurantId}/ingredient/{id}
 * @summary Update Ingredient
 * @tags Ingredient
 * @security BearerAuth
 * @param {UpdateIngredientBody} request.body.required  - update ingredient - multipart/form-data
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateIngredientController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updateIngredientSchema.validate(request, { abortEarly: false });

      const { name, minAlert, measure, images } = request.body as Body;

      const ingredient = await ingredientRepository.findOne({
        select: { ...ingredientFindParams },
        where: { finishedAt, id: toNumber(request.params.id), restaurantId: restaurant.id }
      });

      if (!ingredient)
        return notFound({ entity: messages[lang].entity.ingredient, lang, response });

      const imageUrl = images?.[0] ?? undefined;

      await DataSource.transaction(async (manager) => {
        await manager.update(
          IngredientEntity,
          { id: ingredient.id },
          {
            measure,
            minAlert,
            name,
            imageUrl,
            restaurant: { id: restaurant.id }
          }
        );

        if (ingredient.imageUrl && images && images?.length > 0) deleteFiles([ingredient.imageUrl]);
      });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
