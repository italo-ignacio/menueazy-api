import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, ok } from '@main/utils';
import { clientRepository } from '@repository/client';
import type { Request, Response } from 'express';

/**
 * DELETE /client
 * @summary Delete Client
 * @tags Client
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteClientController: Controller =
  () =>
  async ({ lang, client }: Request, response: Response) => {
    try {
      await clientRepository.update({ id: client.id }, { finishedAt: new Date() });

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
