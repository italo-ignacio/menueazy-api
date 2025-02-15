import { userFindParams } from '@data/search';
import { authenticateSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import {
  badRequest,
  errorLogger,
  generateToken,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from '@main/utils';
import { userRepository } from '@repository/user';
import { compare } from 'bcrypt';
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
 * @property {Messages} message
 * @property {string} status
 * @property {LoginPayload} payload
 */

/**
 * POST /login
 * @summary Login
 * @tags A Auth
 * @example request - payload example
 * {
 *   "email": "support@sp.senai.br",
 *   "password": "Senai@127"
 * }
 * @param {LoginBody} request.body.required - application/json
 * @return {LoginResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const clientLoginController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await authenticateSchema.validate(request, { abortEarly: false });

      const { email, password } = request.body as Body;

      const user = await userRepository.findOne({
        select: { ...userFindParams },
        where: { email }
      });

      if (user === null) return badRequest({ message: messages.auth.notFound, response });

      const passwordIsCorrect = await compare(password, user.password);

      if (!passwordIsCorrect) return badRequest({ message: messages.auth.notFound, response });

      const { accessToken } = generateToken({
        email: user.email,
        id: user.id,
        name: user.name,
        role: user.role
      });

      return ok({
        payload: {
          accessToken,
          user: {
            createdAt: user.createdAt,
            email: user.email,
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            updatedAt: user.updatedAt
          }
        },
        response
      });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
