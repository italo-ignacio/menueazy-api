import { userFindParams } from '@data/search';
import type { userQueryFields } from '@data/validation';
import { userListQueryFields } from '@data/validation';
import type { Controller } from '@domain/protocols';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok,
  toNumber
} from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';
import { Not } from 'typeorm';

/**
 * @typedef {object} FindUserPayload
 * @property {array<User>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindUserResponse
 * @property {string} message
 * @property {string} status
 * @property {FindUserPayload} payload
 */

/**
 * GET /user
 * @summary Find Users
 * @tags User
 * @security BearerAuth
 * @param {string} name.query
 * @param {string} email.query
 * @param {string} phone.query
 * @param {integer} restaurantId.query
 * @param {integer} notRestaurantId.query
 * @param {string} roleEnum.query - enum:OWNER,MANAGER,SUPERVISOR,EMPLOYEE
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,phone,email,role,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @return {FindUserResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 */
export const findUserController: Controller =
  () =>
  async ({ query, user, lang }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });

      const { orderBy: order, where } = getGenericFilter<userQueryFields>({
        list: userListQueryFields,
        query
      });

      Object.assign(where, { companyId: user.company.id });

      if (toNumber(query.restaurantId) !== -1)
        Object.assign(where, {
          userRestaurantList: { restaurantId: toNumber(query.restaurantId) }
        });

      if (toNumber(query.notRestaurantId) !== -1)
        Object.assign(where, {
          userRestaurantList: { restaurantId: Not(toNumber(query.notRestaurantId)) }
        });

      const [content, totalElements] = await userRepository.findAndCount({
        order,
        select: userFindParams,
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
