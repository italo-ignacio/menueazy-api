import { restaurantFindParams } from '@data/search';
import type { restaurantQueryFields } from '@data/validation';
import { restaurantListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindRestaurantPayload
 * @property {array<Restaurant>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindRestaurantResponse
 * @property {string} message
 * @property {string} status
 * @property {FindRestaurantPayload} payload
 */

/**
 * GET /restaurant
 * @summary Find Restaurant
 * @tags Restaurant
 * @security BearerAuth
 * @param {string} name.query
 * @param {string} restaurantUrl.query
 * @param {string} hasDeliveryBoolean.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,restaurantUrl,hasDelivery,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindRestaurantResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findRestaurantController: Controller =
  () =>
  async ({ query, lang, user }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<restaurantQueryFields>({
        list: restaurantListQueryFields,
        query
      });

      Object.assign(where, { companyId: user.company.id, userRestaurantList: { userId: user.id } });

      const [content, totalElements] = await restaurantRepository.findAndCount({
        order,
        select: restaurantFindParams,
        skip,
        take,
        relations: { openingHourList: true },
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
