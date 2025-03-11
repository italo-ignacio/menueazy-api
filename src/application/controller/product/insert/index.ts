import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import { productRepository } from '@repository/product';
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
      const names = {
        pt: `Produto`,
        es: `Producto`,
        en: `Product`
      };

      const name = names[lang];

      const { identifiers } = await productRepository.insert({
        name,
        price: 0,
        restaurantId: restaurant.id
      });

      return created({ lang, response, payload: identifiers[0] });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
