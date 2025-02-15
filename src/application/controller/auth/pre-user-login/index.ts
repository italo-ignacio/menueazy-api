import { userFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import {
  badRequest,
  errorLogger,
  messageErrorResponse,
  ok,
  random,
  validationErrorResponse
} from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  email: string;
}

/**
 * @typedef {object} PreLoginBody
 * @property {string} email.required
 */

/**
 * @typedef {object} PreLoginPayload
 * @property {boolean} hasUser.required
 */

/**
 * @typedef {object} PreLoginResponse
 * @property {Messages} message
 * @property {string} status
 * @property {PreLoginPayload} payload
 */

/**
 * POST /auth/pre-user-login
 * @summary Pre User Login
 * @tags A Auth
 * @example request - payload example
 * {
 *   "email": "email@email"
 * }
 * @param {PreLoginBody} request.body.required - application/json
 * @return {PreLoginResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const preUserLoginController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const { email } = request.body as Body;

      if (typeof email !== 'string')
        return badRequest({ message: messages[lang].error.loginFailed, lang, response });

      const user = await userRepository.findOne({
        select: { ...userFindParams },
        where: { email }
      });

      console.log(user);

      return ok({
        payload: { hasUser: user !== null, code: random() },
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
