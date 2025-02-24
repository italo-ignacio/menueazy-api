import { hasUserByEmail } from '@application/helper';
import { insertUserSchema } from '@data/validation';
import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import {
  badRequest,
  created,
  errorLogger,
  messageErrorResponse,
  validationErrorResponse
} from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
}

/**
 * @typedef {object} InsertUserBody
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role.required
 * @property {string} phone.required
 */

/**
 * POST /user
 * @summary Insert User
 * @tags User
 * @security BearerAuth
 * @example request - payload example
 * {
 *   "name": "admin",
 *   "phone": "(11) 97562-7264",
 *   "email": "admin@admin",
 *   "role": "ADMIN",
 *   "password": "Senai@127"
 * }
 * @param {InsertUserBody} request.body.required
 * @return {InsertResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertUserController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertUserSchema.validate(request, { abortEarly: false });

      const { email, name, phone, role } = request.body as Body;

      if ((await hasUserByEmail(email)) !== false)
        return badRequest({ message: messages[lang].error.emailInUse, lang, response });

      await userRepository.insert({
        email,
        name,
        role,
        phone: phone.replace(/\D/gu, '')
      });

      return created({ response, lang });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
