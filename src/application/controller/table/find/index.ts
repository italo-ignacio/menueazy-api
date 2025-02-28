import { tableFindParams } from '@data/search';
import type { tableQueryFields } from '@data/validation';
import { tableListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { tableRepository } from '@repository/table';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindTablePayload
 * @property {array<Table>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindTableResponse
 * @property {string} message
 * @property {string} status
 * @property {FindTablePayload} payload
 */

/**
 * GET /restaurant/{restaurantId}/table
 * @summary Find Table
 * @tags Table
 * @param {integer} restaurantId.path.required
 * @param {string} name.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindTableResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findTableController: Controller =
  () =>
  async ({ query, lang, restaurant }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<tableQueryFields>({
        list: tableListQueryFields,
        query
      });

      Object.assign(where, { restaurantId: restaurant.id });

      const [content, totalElements] = await tableRepository.findAndCount({
        order,
        select: tableFindParams,
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
