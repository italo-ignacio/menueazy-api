import { findProductQueryParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindProductPayload
 * @property {array<Product>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindProductResponse
 * @property {string} message
 * @property {string} status
 * @property {FindProductPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/product/all
 * @summary Find All Product
 * @tags Product
 * @param {integer} restaurantId.path.required
 * @return {FindProductResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findAllProductController: Controller =
  () =>
  async ({ lang, restaurant }: Request, response: Response) => {
    try {
      // const key = cacheKeys.productsByRestaurant(restaurant.id);

      // const cacheData = (await cache.get(key)) as CategoryEntity[] | null;

      // if (cacheData?.length) {
      //   console.log(`cache of restaurant: ${restaurant.id}`);

      //   return ok({ payload: cacheData, lang, response });
      // }

      const queryBuilder = categoryRepository
        .createQueryBuilder('c')
        .select(findProductQueryParams)
        .innerJoin('c.productCategoryList', 'pcl')
        .leftJoin('pcl.product', 'p')
        .leftJoin('p.productImageList', 'pil')
        .leftJoin('p.productOptionGroupList', 'pogl')
        .leftJoin('pogl.productOptionItemList', 'poil')
        .where('c.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .andWhere('p.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .andWhere('c.finishedAt IS NULL')
        .andWhere('pcl.finishedAt IS NULL')
        .andWhere('p.finishedAt IS NULL')
        .andWhere('pil.finishedAt IS NULL')
        .andWhere('pogl.finishedAt IS NULL')
        .andWhere('poil.finishedAt IS NULL')
        .orderBy('c.order', 'ASC')
        .addOrderBy('p.id', 'ASC')
        .addOrderBy('pogl.id', 'ASC')
        .addOrderBy('poil.id', 'ASC')
        .addOrderBy('pil.primary', 'DESC');

      const data = await queryBuilder.getMany();

      // await cache.set(key, data);

      return ok({ payload: data, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
