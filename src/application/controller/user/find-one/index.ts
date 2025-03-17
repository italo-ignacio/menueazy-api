import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneUserResponse
 * @property {string} message
 * @property {string} status
 * @property {User} payload
 */

/**
 * GET /user/{id}
 * @summary Find one User
 * @tags User
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {FindOneUserResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneUserController: Controller =
  () =>
  async ({ lang, user, ...request }: Request, response: Response) => {
    try {
      const findParams = [
        'u.id',
        'u.name',
        'u.email',
        'u.phone',
        'u.role',
        'u.createdAt',
        'u.updatedAt',
        'u.finishedAt',

        'url.id',

        'r.id',
        'r.name',
        'r.restaurantUrl'
      ];

      const data = await userRepository
        .createQueryBuilder('u')
        .select(findParams)
        .leftJoin('u.userRestaurantList', 'url')
        .innerJoin('url.restaurant', 'r')
        .where('u.id = :id', { id: toNumber(request.params.id) })
        .andWhere('u.companyId = :companyId', { companyId: user.company.id })
        .andWhere('u.finishedAt IS NULL')
        .getOne();

      if (data === null) return notFound({ entity: messages[lang].entity.user, lang, response });

      const { userRestaurantList, ...rest } = data;

      return ok({
        payload: { rest, restaurantList: userRestaurantList.map((item) => item.restaurant) },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
