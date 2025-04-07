import { finishedAt } from '@application/helper';
import { insertIngredientSchema } from '@data/validation';
import { IngredientMeasure } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, created, errorLogger, messageErrorResponse } from '@main/utils';
import { ingredientRepository } from '@repository/ingredient';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  measure: IngredientMeasure;
  minAlert?: number;
  images?: string[];
}

/**
 * @typedef {object} InsertIngredientBody
 * @property {string} name.required
 * @property {string} measure.required - enum:GRAM,KILOGRAM,MILLILITER,LITER,UNIT
 * @property {number} minAlert
 * @property {string} images - Ingredient image - binary
 */

/**
 * POST /restaurant/{restaurantId}/ingredient
 * @summary Insert Ingredient
 * @tags Ingredient
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertIngredientBody} request.body.required  - insert ingredient - multipart/form-data
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertIngredientController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await insertIngredientSchema.validate(request, { abortEarly: false });

      const { name, measure, minAlert, images } = request.body as Body;

      const imageUrl = images?.[0] ?? undefined;

      const hasIngredient = await ingredientRepository.findOne({
        select: { id: true },
        where: { restaurantId: restaurant.id, name, finishedAt }
      });

      if (hasIngredient)
        return badRequest({ lang, response, message: messages[lang].error.ingredientAlreadyExist });

      await ingredientRepository.insert({
        measure,
        minAlert,
        name,
        imageUrl,
        restaurant: { id: restaurant.id }
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
