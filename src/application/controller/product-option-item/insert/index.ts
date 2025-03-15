import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { created, errorLogger, messageErrorResponse, notFound } from '@main/utils';
import { productOptionGroupRepository } from '@repository/product-option-group';
import { productOptionItemRepository } from '@repository/product-option-item';
import type { Request, Response } from 'express';

interface Body {
  productOptionGroupId: number;
}

/**
 * @typedef {object} InsertProductOptionItemBody
 * @property {integer} productOptionGroupId.required
 */

/**
 * POST /restaurant/{restaurantId}/product-option-item
 * @summary Delete Product Option Item
 * @tags Product Option Item
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertProductOptionItemBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertProductOptionItemController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const { productOptionGroupId } = request.body as Body;

      if (typeof productOptionGroupId !== 'number')
        return notFound({ entity: messages[lang].entity.product, lang, response });

      const productOptionGroup = await productOptionGroupRepository.findOne({
        select: { id: true },
        where: { id: productOptionGroupId, product: { restaurantId: restaurant.id } },
        relations: { product: true }
      });

      if (!productOptionGroup)
        return notFound({ entity: messages[lang].entity.product, lang, response });

      await productOptionItemRepository.insert({
        name: '',
        productOptionGroup
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
