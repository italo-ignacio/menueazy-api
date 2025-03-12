import { findProductQueryParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { productRepository } from '@repository/product';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneProductResponse
 * @property {string} message
 * @property {string} status
 * @property {Product} payload
 */

/**
 * GET /restaurant/{restaurantId}/product/{id}
 * @summary Find One Product
 * @tags Product
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {FindOneProductResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneProductController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const queryBuilder = productRepository
        .createQueryBuilder('p')
        .innerJoin('p.productCategoryList', 'pcl')
        .leftJoin('pcl.category', 'c')
        .leftJoin('p.productImageList', 'pil')
        .leftJoin('p.productOptionGroupList', 'pogl')
        .leftJoin('pogl.productOptionItemList', 'poil')
        .where('p.id = :id', { id: Number(request.params.id) })
        .andWhere('p.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .andWhere('pcl.finishedAt IS NULL')
        .andWhere('p.finishedAt IS NULL')
        .andWhere('pil.finishedAt IS NULL')
        .andWhere('pogl.finishedAt IS NULL')
        .andWhere('poil.finishedAt IS NULL')
        .orderBy('p.id', 'ASC')
        .addOrderBy('pogl.id', 'ASC')
        .addOrderBy('poil.id', 'ASC')
        .addOrderBy('pil.primary', 'DESC')
        .select(findProductQueryParams);

      const payload = await queryBuilder.getOne();

      if (payload === null)
        return notFound({ entity: messages[lang].entity.product, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
