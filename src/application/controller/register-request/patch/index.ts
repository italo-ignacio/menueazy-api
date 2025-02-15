import { updateRegisterRequestSchema } from '@data/validation/auth';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { registerRequestRepository } from '@repository/register-request';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  canRegister: boolean;
}

/**
 * @typedef {object} UpdateRegisterRequestBody
 * @property {boolean} canRegister.required
 */

/**
 * @typedef {object} UpdateRegisterRequestResponse
 * @property {Messages} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * PATCH /register-request/:id
 * @summary Patch Register Request
 * @tags Register Request
 * @security BearerAuth
 * @param {UpdateRegisterRequestBody} request.body.required - application/json
 * @return {UpdateRegisterRequestResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const patchRegisterRequestController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await updateRegisterRequestSchema.validate(request, { abortEarly: false });

      const { canRegister } = request.body as Body;

      await registerRequestRepository.update({ id: Number(request.params.id) }, { canRegister });

      return ok({ lang, payload: messages[lang].default.successfullyUpdated, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
