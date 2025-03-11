import { hasUserByEmail, userIsOwner } from '@application/helper';
import { updateUserSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, forbidden, messageErrorResponse, ok } from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';

interface Body {
  password?: string;
  email?: string;
  name?: string;
  phone?: string;
}

/**
 * @typedef {object} UpdateUserBody
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 */

/**
 * PUT /user/{id}
 * @summary Update User
 * @tags User
 * @security BearerAuth
 * @param {UpdateUserBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateUserController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      if (!userIsOwner(request as Request))
        return forbidden({
          message: { english: 'update this user', portuguese: 'atualizar este usuário' },
          lang,
          response
        });

      await updateUserSchema.validate(request, { abortEarly: false });

      const { email, name, phone } = request.body as Body;

      if (typeof email === 'string' && (await hasUserByEmail(email)) !== false)
        return badRequest({ message: messages[lang].error.duplicateKey, lang, response });

      let newPhone: string | undefined;

      if (typeof phone === 'string') newPhone = phone.replace(/\D/gu, '');

      await userRepository.update(
        { id: Number(request.params.id) },
        { email, name, phone: newPhone }
      );

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
