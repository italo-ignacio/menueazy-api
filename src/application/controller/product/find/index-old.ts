import { findProductQueryParams } from '@data/search';
import type { productQueryFields } from '@data/validation';
import { productListQueryFields } from '@data/validation';
import { ProductStatus } from '@domain/enum';
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
 * @param {string} name.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,price,published,highlight,inStock,createdAt,updatedAt
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

      let order = 'p.createdAt';
      let sort: 'ASC' | 'DESC' = 'DESC';

      if (orderItem && typeof orderItem.value !== 'undefined') {
        if (orderItem.value === 'orderTotal') {
          order = `COALESCE("orderStatus"."totalOrder", 0)`;
        } else if (orderItem.value === 'reviewAvg') {
          order = `COALESCE("reviewStats"."avgRate", 0)`;
        } else if (orderItem.value === 'reviewTotal') {
          order = `COALESCE("reviewStats"."totalRate", 0)`;
        } else {
          order = `p.${orderItem.value}`;
        }

        sort = orderItem.sort;
      }

      console.log(order, sort);

      const subquery = productRepository
        .createQueryBuilder('p')
        .select('p.id', 'id')
        .where('p.finishedAt IS NULL')
        .andWhere('p.restaurantId = :restaurantId', { restaurantId: restaurant.id });

      if (typeof query.name === 'string')
        subquery.andWhere('p.name ILIKE :name', { name: `%${query.name}%` });

      if (orderItem?.value === 'orderTotal')
        subquery
          .leftJoin('p.orderProductList', 'op')
          .addSelect('COALESCE(SUM(op.quantity), 0)', 'sum_quantity')
          .orderBy('sum_quantity', sort)
          .groupBy('p.id');

      const productIdsQuery = subquery.skip(skip).limit(take);

      const productList = await productIdsQuery.getRawMany();
      const totalElements = await productIdsQuery.getCount();

      const productIds = productList.map((item) => {
        console.log(item);

        return item.id;
      });

      if (productIds.length === 0)
        return ok({
          payload: { content: [], totalElements, totalPages: Math.ceil(totalElements / take) },
          lang,
          response
        });

      const reviewSubquery = productRepository
        .createQueryBuilder('p2')
        .select('p2.id', 'productId')
        .addSelect('AVG(rl.rateNumeric)', 'avgRate')
        .addSelect('COUNT(rl.id)', 'totalRate')
        .leftJoin('p2.reviewList', 'rl')
        .where('rl.finishedAt IS NULL')
        .groupBy('p2.id');

      const orderSubquery = productRepository
        .createQueryBuilder('p3')
        .select('p3.id', 'productId')
        .addSelect('SUM(opl.quantity)', 'totalOrder')
        .leftJoin('p3.orderProductList', 'opl')
        .where('opl.finishedAt IS NULL')
        .andWhere('opl.status = :type', { type: ProductStatus.FINISHED })
        .groupBy('p3.id');

      const queryBuilder = productRepository
        .createQueryBuilder('p')
        .select([
          ...findProductQueryParams,
          '"reviewStats"."avgRate"',
          '"reviewStats"."totalRate"',
          '"orderStatus"."totalOrder"'
        ])
        .innerJoin('p.productCategoryList', 'pcl')
        .leftJoin('pcl.category', 'c')
        .leftJoin('p.productImageList', 'pil')
        .leftJoin('p.productOptionGroupList', 'pogl')
        .leftJoin('pogl.productOptionItemList', 'poil')
        .leftJoin(
          `(${orderSubquery.getQuery()})`,
          'orderStatus',
          '"orderStatus"."productId" = p.id'
        )
        .leftJoin(
          `(${reviewSubquery.getQuery()})`,
          'reviewStats',
          '"reviewStats"."productId" = p.id'
        )
        .where('p.id IN (:...productIds)', { productIds })
        .andWhere('pcl.finishedAt IS NULL')
        .andWhere('c.finishedAt IS NULL')
        .andWhere('pil.finishedAt IS NULL')
        .andWhere('pogl.finishedAt IS NULL')
        .andWhere('poil.finishedAt IS NULL')
        .orderBy(order, sort)
        .setParameters(reviewSubquery.getParameters())
        .setParameters(orderSubquery.getParameters());

      const { entities, raw } = await queryBuilder.getRawAndEntities();

      const content = entities.map((item, index) => {
        const { productCategoryList, productImageList, ...values } = item;

        const avgRate = parseFloat(raw[index].avgRate);
        const totalRate = parseFloat(raw[index].totalRate);
        const totalOrder = parseFloat(raw[index].totalOrder ?? 0);

        return {
          ...values,
          avgRate,
          totalOrder,
          totalRate,
          imageList: productImageList.map((itemImage) => itemImage),
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
