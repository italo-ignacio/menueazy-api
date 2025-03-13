import type { Controller } from '@domain/protocols';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';

/**
 * @typedef {object} CategoryContent
 * @property {integer} id
 * @property {string} name
 * @property {string|null} description
 * @property {integer} order
 * @property {integer} productCount
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string|null} finishedAt
 */

/**
 * @typedef {object} FindCategoryPayload
 * @property {array<CategoryContent>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindCategoryResponse
 * @property {string} message
 * @property {string} status
 * @property {FindCategoryPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/category
 * @summary Find Category
 * @tags Category
 * @param {integer} restaurantId.path.required
 * @param {string} name.query
 * @return {FindCategoryResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findCategoryController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const name = `%${query.name ?? ''}%`;

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
        .orderBy('c.order', 'ASC')
        .where('c.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .andWhere('c.finishedAt IS NULL')
        .andWhere('c.name ILIKE :name', { name })
        .getMany();

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
