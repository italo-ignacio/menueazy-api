import { styleFindParams } from '@data/search';
import type { styleQueryFields } from '@data/validation';
import { styleListQueryFields } from '@data/validation';
import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { styleRepository } from '@repository/style';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindStylePayload
 * @property {array<Style>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindStyleResponse
 * @property {string} message
 * @property {string} status
 * @property {FindStylePayload} payload
 */

/**
 * GET /style
 * @summary Find Style
 * @tags Style
 * @security BearerAuth
 * @param {string} name.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindStyleResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findStyleController: Controller =
  () =>
  async ({ query, lang, user }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<styleQueryFields>({
        list: styleListQueryFields,
        query
      });

      if (user.role !== Role.ADMIN)
        Object.assign(where, { generic: true, company: { id: user.company.id } });

      const [content, totalElements] = await styleRepository.findAndCount({
        order,
        select: styleFindParams,
        skip,
        take,
        where: { generic: true }
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
