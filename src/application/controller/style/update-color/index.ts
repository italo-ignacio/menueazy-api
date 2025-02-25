import { updateColorSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { colorRepository } from '@repository/color';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  primary: string;
  textPrimary: string;
  secondary: string;
  textSecondary: string;
  text: string;
  background: string;
}

/**
 * @typedef {object} UpdateColorBody
 * @property {string} primary.required
 * @property {string} textPrimary.required
 * @property {string} secondary.required
 * @property {string} textSecondary.required
 * @property {string} background.required
 * @property {string} text.required
 */

/**
 * PUT /style/color/{id}
 * @summary Update Color
 * @tags Style
 * @security BearerAuth
 * @param {UpdateColorBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateStyleColorController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await updateColorSchema.validate(request, { abortEarly: false });

      const { background, primary, secondary, text, textPrimary, textSecondary } =
        request.body as Body;

      await colorRepository.update(
        { id: Number(request.params.id) },
        { background, primary, secondary, text, textPrimary, textSecondary }
      );

      return ok({ payload: messages.default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
