import { registerRequestFindParams } from '@data/search';
import type { registerRequestQueryFields } from '@data/validation';
import { registerRequestListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { registerRequestRepository } from '@repository/register-request';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindRegisterRequestPayload
 * @property {array<RegisterRequest>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindRegisterRequestResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindRegisterRequestPayload} payload
 */

/**
 * GET /register-request
 * @summary Find Register Request
 * @tags Register Request
 * @security BearerAuth
 * @param {string} name.query
 * @param {string} email.query
 * @param {string} phone.query
 * @param {string} companyName.query
 * @param {string} currencyId.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,phone,email,companyName,currency,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindRegisterRequestResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findRegisterRequestController: Controller =
  () =>
  async ({ query, lang }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<registerRequestQueryFields>({
        list: registerRequestListQueryFields,
        query
      });

      const [content, totalElements] = await registerRequestRepository.findAndCount({
        order,
        select: registerRequestFindParams,
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
