import type { Controller } from '@domain/protocols';
import { CategoryEntity } from '@entity/category';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}/category/{id}
 * @summary Delete Category
 * @tags Category
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteCategoryController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await DataSource.createQueryBuilder()
        .update(CategoryEntity)
        .set({ finishedAt: new Date() })
        .where('id = :id', { id: Number(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: restaurant.id })
        .execute();

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages[lang].error.notFound, lang, response });
    }
  };
