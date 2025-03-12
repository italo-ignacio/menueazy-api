import { finishedAt } from '@application/helper';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { CategoryEntity } from '@entity/category';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { cache } from '@infra/redis';
import { badRequest, errorLogger, ok } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';
import { Not } from 'typeorm';

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
      const categories = await categoryRepository.find({
        select: { id: true },
        where: { finishedAt, id: Not(Number(request.params.id)), restaurantId: restaurant.id },
        order: { order: 'ASC' }
      });

      if (categories.length === 0)
        return badRequest({
          lang,
          response,
          message: messages[lang].error.oneCategoryIsRequired
        });

      await DataSource.createQueryBuilder()
        .update(CategoryEntity)
        .set({ finishedAt: new Date(), order: 0 })
        .where('id = :id', { id: Number(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: restaurant.id })
        .execute();

      await categoryRepository.save(
        categories.map((item, index) => ({ id: item.id, order: index + 1 }))
      );

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
