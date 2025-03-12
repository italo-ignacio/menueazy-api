import { finishedAt } from '@application/helper';
import type { Controller } from '@domain/protocols';
import { CategoryEntity } from '@entity/category';
import { ProductEntity } from '@entity/product';
import { ProductCategoryEntity } from '@entity/product-category';
import { DataSource } from '@infra/database';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import type { Request, Response } from 'express';

/**
 * @typedef {object} InsertProductResponsePayload
 * @property {number} id
 */

/**
 * @typedef {object} InsertProductResponse
 * @property {string} message
 * @property {string} status
 * @property {InsertProductResponsePayload} payload
 */

/**
 * POST /restaurant/{restaurantId}/product
 * @summary Insert Product
 * @tags Product
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @return {InsertProductResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertProductController: Controller =
  () =>
  async ({ lang, restaurant }: Request, response: Response) => {
    try {
      let payload = {};

      await DataSource.transaction(async (manager) => {
        const { identifiers } = await manager.insert(ProductEntity, {
          name: '',
          price: 0,
          restaurantId: restaurant.id
        });

        payload = identifiers;

        const category = await manager.findOne(CategoryEntity, {
          select: { id: true },
          where: { restaurantId: restaurant.id, finishedAt },
          order: { createdAt: 'ASC' }
        });

        if (category)
          await manager.insert(ProductCategoryEntity, {
            category,
            product: { id: identifiers[0].id }
          });
      });

      return created({ lang, response, payload });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
