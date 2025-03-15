import { finishedAt } from '@application/helper';
import type { Controller } from '@domain/protocols';
import { ProductImageEntity } from '@entity/product-image';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { productImageRepository } from '@repository/product-image';
import type { Request, Response } from 'express';
import { Not } from 'typeorm';

interface Body {
  primary: boolean;
}

/**
 * @typedef {object} UpdateProductImageBody
 * @property {boolean} primary.required
 */

/**
 * PUT /restaurant/{restaurantId}/product/{productId}/image/{id}
 * @summary Update Product Image
 * @tags Product Image
 * @security BearerAuth
 * @param {UpdateProductImageBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} productId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateProductImageController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const { primary } = request.body as Body;

      if (typeof primary !== 'boolean') return badRequest({ lang, response });

      const image = await productImageRepository
        .createQueryBuilder('pi')
        .select('pi.id')
        .leftJoin('pi.product', 'p')
        .where('p.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .andWhere('pi.id = :id', { id: toNumber(request.params.id) })
        .andWhere('p.id = :productId', { productId: toNumber(request.params.productId) })
        .andWhere('p.finishedAt IS NULL')
        .andWhere('pi.finishedAt IS NULL')
        .getOne();

      if (image === null)
        return notFound({ entity: messages[lang].entity.productImage, lang, response });

      await DataSource.transaction(async (manager) => {
        await manager.update(ProductImageEntity, { id: image.id }, { primary });
        await manager.update(
          ProductImageEntity,
          { productId: toNumber(request.params.productId), finishedAt, id: Not(image.id) },
          { primary: false }
        );
      });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
