import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, notFound, ok } from '@main/utils';
import { productOptionGroupRepository } from '@repository/product-option-group';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}/product-option-group/{id}
 * @summary Delete Product Option Group
 * @tags Product Option Group
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteProductOptionGroupController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const productOptionGroup = await productOptionGroupRepository.findOne({
        select: { id: true, product: { restaurantId: true } },
        where: { id: Number(request.params.id) },
        relations: { product: true }
      });

      if (
        !productOptionGroup ||
        !productOptionGroup.product ||
        productOptionGroup?.product?.restaurantId !== restaurant.id
      )
        return notFound({ entity: messages[lang].entity.productOptionGroup, lang, response });

      await productOptionGroupRepository.update(
        { id: productOptionGroup.id },
        { finishedAt: new Date() }
      );

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages[lang].error.notFound, lang, response });
    }
  };
