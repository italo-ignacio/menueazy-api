import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneCategoryResponse
 * @property {string} message
 * @property {string} status
 * @property {Category} payload
 */

/**
 * GET /restaurant/{restaurantId}/category/{id}
 * @summary Find One Category
 * @tags Category
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {FindOneCategoryResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneCategoryController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const selectValues = [
        'c.id',
        'c.name',
        'c.description',
        'c.order',
        'c.createdAt',
        'c.updatedAt',
        'c.finishedAt'
      ];

      const payload = await categoryRepository
        .createQueryBuilder('c')
        .select(selectValues)
        .leftJoin('c.productCategoryList', 'pcl')
        .leftJoin('pcl.product', 'product')
        .loadRelationCountAndMap('c.productCount', 'c.productCategoryList', 'rp', (qb) =>
          qb.innerJoin('rp.product', 'p').where('p.finishedAt IS NULL')
        )
        .where('c.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .andWhere('c.id = :id', { id: toNumber(request.params.id) })
        .andWhere('c.finishedAt IS NULL')
        .getOne();

      if (payload === null)
        return notFound({ entity: messages[lang].entity.category, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
