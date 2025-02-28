import { userFindParams } from '@data/search';
import { authenticateSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import {
  badRequest,
  errorLogger,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  email: string;
  password: string;
}

/**
 * @typedef {object} LoginBody
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef {object} LoginPayload
 * @property {string} accessToken.required
 * @property {User} user.required
 */

/**
 * @typedef {object} LoginResponse
 * @property {string} message
 * @property {string} status
 * @property {LoginPayload} payload
 */

/**
 * POST /client/login
 * @summary Login
 * @tags A Auth
 * @param {LoginBody} request.body.required - application/json
 * @return {LoginResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const clientLoginController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await authenticateSchema.validate(request, { abortEarly: false });

      const { email } = request.body as Body;

      const user = await userRepository.findOne({
        select: { ...userFindParams },
        where: { email }
      });

      if (user === null)
        return badRequest({ lang, message: messages[lang].error.notFound, response });

      return ok({
        payload: user,
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
