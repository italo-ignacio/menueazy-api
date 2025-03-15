import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { cache } from '@infra/redis';
import { badRequest, errorLogger, notFound, ok, toNumber } from '@main/utils';
import { productOptionGroupRepository } from '@repository/product-option-group';
import { productOptionItemRepository } from '@repository/product-option-item';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}/product-option-item/{id}
 * @summary Delete Product Option Item
 * @tags Product Option Item
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteProductOptionItemController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const productOptionGroup = await productOptionGroupRepository.findOne({
        select: { id: true },
        where: {
          productOptionItemList: { id: toNumber(request.params.id) },
          product: { restaurantId: restaurant.id }
        },
        relations: { product: true, productOptionItemList: true }
      });

      if (!productOptionGroup)
        return notFound({ entity: messages[lang].entity.productOptionItem, lang, response });

      await productOptionItemRepository.update(
        { id: toNumber(request.params.id) },
        { finishedAt: new Date() }
      );

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
