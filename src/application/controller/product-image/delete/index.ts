import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, deleteFiles, errorLogger, notFound, ok, toNumber } from '@main/utils';
import { productImageRepository } from '@repository/product-image';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}/product/{productId}/image/{id}
 * @summary Delete Product Image
 * @tags Product Image
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {integer} productId.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteProductImageController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const image = await productImageRepository
        .createQueryBuilder('pi')
        .select(['pi.id', 'pi.url'])
        .leftJoin('pi.product', 'p')
        .where('p.restaurantId = :restaurantId', { restaurantId: restaurant.id })
        .andWhere('pi.id = :id', { id: toNumber(request.params.id) })
        .andWhere('p.id = :productId', { productId: toNumber(request.params.productId) })
        .andWhere('p.finishedAt IS NULL')
        .andWhere('pi.finishedAt IS NULL')
        .getOne();

      if (image === null)
        return notFound({ entity: messages[lang].entity.productImage, lang, response });

      await productImageRepository.delete({ id: image.id });

      deleteFiles([image.url]);

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
