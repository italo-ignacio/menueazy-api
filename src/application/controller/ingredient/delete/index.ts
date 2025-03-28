import type { Controller } from '@domain/protocols';
import { IngredientEntity } from '@entity/ingredient';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok, toNumber } from '@main/utils';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}/ingredient/{id}
 * @summary Delete Ingredient
 * @tags Ingredient
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteIngredientController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await DataSource.createQueryBuilder()
        .update(IngredientEntity)
        .set({ finishedAt: new Date() })
        .where('id = :id', { id: toNumber(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: restaurant.id })
        .execute();

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
