import { registerRequestFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { registerRequestRepository } from '@repository/register-request';
import type { Request, Response } from 'express';
import { IsNull } from 'typeorm';

/**
 * @typedef {object} FindOneRegisterRequestResponse
 * @property {string} message
 * @property {string} status
 * @property {RegisterRequest} payload
 */

/**
 * GET /register-request/{id}
 * @summary Find One Register Request
 * @tags Register Request
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {FindOneRegisterRequestResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneRegisterRequestController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const payload = await registerRequestRepository.findOne({
        select: registerRequestFindParams,
        where: { id: Number(request.params.id), finishedAt: IsNull() }
      });

      if (payload === null)
        return notFound({
          entity: messages[lang].entity.registerRequest,
          lang,
          response
        });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
