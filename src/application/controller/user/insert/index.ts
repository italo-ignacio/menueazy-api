import { ValidationError } from 'yup';
import {
  badRequest,
  created,
  errorLogger,
  messageErrorResponse,
  validationErrorResponse
} from '@main/utils';
import { env } from '@main/config';
import { hasUserByEmail } from '@application/helper';
import { hash } from 'bcrypt';
import { insertUserSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import { userRepository } from '@repository/user';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';
import { Role } from '@domain/enum';

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
  () => async (request: Request, response: Response) => {
    try {
      await insertUserSchema.validate(request, { abortEarly: false });

      const { email, name, password, phone, role } = request.body as Body;

      if ((await hasUserByEmail(email)) !== false)
        return badRequest({ message: messages.auth.userAlreadyExists, response });

      const { HASH_SALT } = env;

      const hashedPassword = await hash(password, HASH_SALT);

      await userRepository.insert({
        email,
        name,
        role,
        password: hashedPassword,
        phone: phone.replace(/\D/gu, '')
      });

      return created({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
