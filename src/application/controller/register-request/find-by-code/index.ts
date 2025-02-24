import { registerRequestFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, isUuid, messageErrorResponse, notFound, ok } from '@main/utils';
import { registerRequestRepository } from '@repository/register-request';
import type { Request, Response } from 'express';
import { IsNull } from 'typeorm';

/**
 * GET /register-request/{code}/code
 * @summary Find Register Request by Code
 * @tags Register Request
 * @param {string} code.path.required
 * @return {FindOneRegisterRequestResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneRegisterRequestController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      if (!isUuid(request.params.code))
        return notFound({
          entity: messages[lang].entity.subscription,
          lang,
          response
        });

      const payload = await registerRequestRepository.findOne({
        select: registerRequestFindParams,
        where: { code: request.params.code, finishedAt: IsNull() }
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
