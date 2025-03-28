import { finishedAt } from '@application/helper';
import { ingredientFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { ingredientRepository } from '@repository/ingredient';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneIngredientResponse
 * @property {string} message
 * @property {string} status
 * @property {Ingredient} payload
 */

/**
 * GET /restaurant/{restaurantId}/ingredient/{id}
 * @summary Find One Ingredient
 * @tags Ingredient
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {FindOneIngredientResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneIngredientController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const payload = await ingredientRepository.findOne({
        select: ingredientFindParams,
        where: { id: toNumber(request.params.id), restaurantId: restaurant.id, finishedAt }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.ingredient, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
