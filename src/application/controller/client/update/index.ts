import { updateClientSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import { clientRepository } from '@repository/client';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  phone?: string;
}

/**
 * @typedef {object} UpdateClientBody
 * @property {string} name
 * @property {string} phone
 */

/**
 * PUT /client
 * @summary Update Client
 * @tags Client
 * @security BearerAuth
 * @param {UpdateClientBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateClientController: Controller =
  () =>
  async ({ lang, client, ...request }: Request, response: Response) => {
    try {
      await updateClientSchema.validate(request, { abortEarly: false });

      const { name, phone } = request.body as Body;

      await clientRepository.update({ id: client.id }, { name, phone });

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
