import { finishedAt } from '@application/helper';
import type { Controller } from '@domain/protocols';
import { ProductImageEntity } from '@entity/product-image';
import { messages } from '@i18n/index';
import {
  badRequest,
  created,
  errorLogger,
  messageErrorResponse,
  notFound,
  toNumber
} from '@main/utils';
import { productRepository } from '@repository/product';
import { productImageRepository } from '@repository/product-image';
import { ok } from 'assert';
import type { Request, Response } from 'express';

interface Body {
  images: string[];
}

/**
 * @typedef {object} InsertProductImageBody
 * @property {string} images.required - Product images - binary
 */

/**
 * POST /restaurant/{restaurantId}/product/{productId}/image
 * @summary Insert Product Image
 * @tags Product Image
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} productId.path.required
 * @param {InsertProductImageBody} request.body.required - insert product image - multipart/form-data
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertProductImageController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const { images } = request.body as Body;

      if (!Array.isArray(images) || images?.length === 0) return badRequest({ lang, response });

      const product = await productRepository.findOne({
        select: { id: true },
        where: { id: toNumber(request.params.productId), finishedAt, restaurantId: restaurant.id }
      });

      if (!product) return notFound({ entity: messages[lang].entity.product, lang, response });

      const newImages: Partial<ProductImageEntity>[] = [];

      images?.forEach((url) => {
        newImages.push({ primary: false, productId: product.id, url });
      });

      if (newImages.length) {
        const { generatedMaps } = await productImageRepository.insert(newImages);

        return created({ lang, payload: generatedMaps, response });
      }

      return ok({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
