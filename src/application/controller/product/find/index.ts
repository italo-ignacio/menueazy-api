import { findProductQueryParams } from '@data/search';
import type { productQueryFields } from '@data/validation';
import { productListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { productRepository } from '@repository/product';
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
 * GET /restaurant/{restaurantId}/product
 * @summary Find Product
 * @tags Product
 * @param {integer} restaurantId.path.required
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindProductResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findProductController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderItem } = getGenericFilter<productQueryFields>({
        list: productListQueryFields,
        query
      });

      const productIdsQuery = productRepository
        .createQueryBuilder('p')
        .select('p.id')
        .where('p.finishedAt IS NULL')
        .andWhere('p.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .orderBy(`p.${orderItem?.value || 'id'}`, orderItem?.sort || 'ASC')
        .skip(skip)
        .take(take);

      const [productList, totalElements] = await productIdsQuery.getManyAndCount();

      const productIds = productList.map((item) => item.id);

      const queryBuilder = productRepository
        .createQueryBuilder('p')
        .select(findProductQueryParams)
        .innerJoin('p.productCategoryList', 'pcl')
        .leftJoin('pcl.category', 'c')
        .leftJoin('p.productImageList', 'pil')
        .leftJoin('p.productOptionGroupList', 'pogl')
        .leftJoin('pogl.productOptionItemList', 'poil')
        .where('p.id IN (:...productIds)', { productIds })
        .andWhere('pcl.finishedAt IS NULL')
        .andWhere('c.finishedAt IS NULL')
        .andWhere('pil.finishedAt IS NULL')
        .andWhere('pogl.finishedAt IS NULL')
        .andWhere('poil.finishedAt IS NULL')
        .orderBy(`p.${orderItem?.value || 'id'}`, orderItem?.sort || 'ASC')
        .addOrderBy('c.order', 'ASC')
        .addOrderBy('pogl.id', 'ASC')
        .addOrderBy('poil.id', 'ASC')
        .addOrderBy('pil.primary', 'DESC');

      const data = await queryBuilder.getMany();

      const content = data.map((item) => {
        const { productCategoryList, ...values } = item;

        return {
          ...values,
          categoryList: productCategoryList.map((itemCategory) => ({ ...itemCategory.category }))
        };
      });

      return ok({
        payload: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / take)
        },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
