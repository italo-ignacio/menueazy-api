import { finishedAt } from '@application/helper';
import { tableFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { tableRepository } from '@repository/table';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneTableResponse
 * @property {string} message
 * @property {string} status
 * @property {Table} payload
 */

/**
 * GET /restaurant/{restaurantId}/table/{id}
 * @summary Find One Table
 * @tags Table
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {FindOneTableResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneTableController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      const payload = await tableRepository.findOne({
        select: tableFindParams,
        where: { id: Number(request.params.id), restaurantId: restaurant.id, finishedAt }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.table, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
