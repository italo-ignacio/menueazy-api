/* eslint-disable @typescript-eslint/no-explicit-any */
import { findProductQueryParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { ProductImageEntity } from '@entity/product-image';
import { ProductOptionItemEntity } from '@entity/product-option-item';
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

      const data = await queryBuilder.getRawMany();

      const formattedResponse = new Map();

      data.forEach((row) => {
        if (!formattedResponse.has(row.c_id)) {
          formattedResponse.set(row.c_id, {
            id: row.c_id,
            name: row.c_name,
            description: row.c_description,
            order: row.c_order,
            createdAt: row.c_created_at,
            updatedAt: row.c_updated_at,
            finishedAt: row.c_finished_at,
            productList: new Map()
          });
        }

        const category = formattedResponse.get(row.c_id);

        if (row.p_id && !category.productList.has(row.p_id)) {
          category.productList.set(row.p_id, {
            id: row.p_id,
            name: row.p_name,
            description: row.p_description,
            price: row.p_price,
            outOfStock: row.p_out_of_stock,
            published: row.p_published,
            highlight: row.p_highlight,
            discount: row.p_discount,
            startDiscountAt: row.p_start_discount_at,
            finishDiscountAt: row.p_finish_discount_at,
            onlyInRestaurant: row.p_only_in_restaurant,
            priceByKmInDelivery: row.p_price_by_km_in_delivery,
            createdAt: row.p_created_at,
            updatedAt: row.p_updated_at,
            finishedAt: row.p_finished_at,
            imageList: [],
            productOptionGroupList: new Map()
          });
        }

        const product = category.productList.get(row.p_id);

        if (
          row.pil_id &&
          !product.imageList.some((img: ProductImageEntity) => img.id === row.pil_id)
        ) {
          product.imageList.push({
            id: row.pil_id,
            primary: row.pil_primary,
            url: row.pil_url,
            createdAt: row.pil_created_at,
            updatedAt: row.pil_updated_at,
            finishedAt: row.pil_finished_at
          });
        }

        if (row.pogl_id && !product.productOptionGroupList.has(row.pogl_id)) {
          product.productOptionGroupList.set(row.pogl_id, {
            id: row.pogl_id,
            name: row.pogl_name,
            description: row.pogl_description,
            maxSelection: row.pogl_max_selection,
            minSelection: row.pogl_min_selection,
            required: row.pogl_required,
            createdAt: row.pogl_created_at,
            updatedAt: row.pogl_updated_at,
            finishedAt: row.pogl_finished_at,
            productOptionItemList: []
          });
        }

        const optionGroup = product.productOptionGroupList.get(row.pogl_id);

        if (
          row.poil_id &&
          !optionGroup.productOptionItemList.some(
            (opt: ProductOptionItemEntity) => opt.id === row.poil_id
          )
        ) {
          optionGroup.productOptionItemList.push({
            id: row.poil_id,
            name: row.poil_name,
            description: row.poil_description,
            imageUrl: row.poil_image_url,
            additionalPrice: row.poil_additional_price,
            createdAt: row.poil_created_at,
            updatedAt: row.poil_updated_at,
            finishedAt: row.poil_finished_at
          });
        }
      });

      const payload = Array.from(formattedResponse.values()).map((category) => ({
        ...category,
        productList: Array.from(category.productList.values()).map((product: any) => ({
          ...product,
          productOptionGroupList: Array.from(product.productOptionGroupList.values())
        }))
      }));

      // await cache.set(key, data);

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
