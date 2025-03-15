import { deliveryPersonFindParams } from '@data/search';
import type { deliveryPersonQueryFields } from '@data/validation';
import { deliveryPersonListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { deliveryPersonRepository } from '@repository/delivery-person';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindDeliveryPersonPayload
 * @property {array<DeliveryPerson>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindDeliveryPersonResponse
 * @property {string} message
 * @property {string} status
 * @property {FindDeliveryPersonPayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/delivery-person
 * @summary Find Delivery Person
 * @tags Delivery Person
 * @param {integer} restaurantId.path.required
 * @param {string} name.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindDeliveryPersonResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findDeliveryPersonController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<deliveryPersonQueryFields>({
        list: deliveryPersonListQueryFields,
        query
      });

      Object.assign(where, { restaurantId: restaurant.id });

      const [content, totalElements] = await deliveryPersonRepository.findAndCount({
        order,
        select: deliveryPersonFindParams,
        skip,
        take,
        where
      });

      return ok({
        payload: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / take)
        },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
