import { finishedAt } from '@application/helper';
import { productFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { productRepository } from '@repository/product';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneProductResponse
 * @property {string} message
 * @property {string} status
 * @property {Product} payload
 */

/**
 * GET /restaurant/{restaurantId}/product/{id}
 * @summary Find One Product
 * @tags Product
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {FindOneProductResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneProductController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const payload = await productRepository.findOne({
        select: productFindParams,
        where: { id: Number(request.params.id), restaurantId: restaurant.id, finishedAt }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.product, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
