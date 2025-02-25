import { styleFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { styleRepository } from '@repository/style';
import type { Request, Response } from 'express';
import { IsNull } from 'typeorm';

/**
 * @typedef {object} FindOneStyleResponse
 * @property {string} message
 * @property {string} status
 * @property {Style} payload
 */

/**
 * GET /style/{id}
 * @summary Find One Style
 * @tags Style
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {FindOneStyleResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneStyleController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const payload = await styleRepository.findOne({
        select: styleFindParams,
        where: { id: Number(request.params.id), finishedAt: IsNull() }
      });

      if (payload === null)
        return notFound({
          entity: messages[lang].entity.style,
          lang,
          response
        });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
