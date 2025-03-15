import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { created, errorLogger, messageErrorResponse, notFound } from '@main/utils';
import { productRepository } from '@repository/product';
import { productOptionGroupRepository } from '@repository/product-option-group';
import type { Request, Response } from 'express';

interface Body {
  productId: number;
}

/**
 * @typedef {object} InsertProductOptionGroupBody
 * @property {integer} productId.required
 */

/**
 * POST /restaurant/{restaurantId}/product-option-group
 * @summary Delete Product Option Group
 * @tags Product Option Group
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertProductOptionGroupBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertProductOptionGroupController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const { productId } = request.body as Body;

      if (typeof productId !== 'number')
        return notFound({ entity: messages[lang].entity.product, lang, response });

      const product = await productRepository.findOne({
        select: { id: true },
        where: { id: productId, restaurantId: restaurant.id }
      });

      if (!product) return notFound({ entity: messages[lang].entity.product, lang, response });

      await productOptionGroupRepository.insert({
        name: '',
        product,
        required: false
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
