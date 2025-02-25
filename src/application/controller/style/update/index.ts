import { updateStyleSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { styleRepository } from '@repository/style';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  name: string;
}

/**
 * @typedef {object} UpdateStyleBody
 * @property {string} name
 */

/**
 * PUT /style/{id}
 * @summary Update Style
 * @tags Style
 * @security BearerAuth
 * @param {UpdateStyleBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateStyleController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await updateStyleSchema.validate(request, { abortEarly: false });

      const { name } = request.body as Body;

      await styleRepository.update({ id: Number(request.params.id) }, { name });

      return ok({ payload: messages.default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
