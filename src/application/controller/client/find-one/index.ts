import { finishedAt } from '@application/helper';
import { clientFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { clientRepository } from '@repository/client';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneClientResponse
 * @property {string} message
 * @property {string} status
 * @property {Client} payload
 */

/**
 * GET /client/{id}
 * @summary Find one Client
 * @tags Client
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {FindOneClientResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneClientController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const payload = await clientRepository.findOne({
        select: clientFindParams,
        where: { id: toNumber(request.params.id), finishedAt }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.table, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
