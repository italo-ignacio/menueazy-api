import { updateUserSchema } from '@data/validation';
import { canChangeRoles, Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { env } from '@main/config';
import { errorLogger, forbidden, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { userRepository } from '@repository/user';
import { hash } from 'bcrypt';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  phone?: string;
}

/**
 * @typedef {object} UpdateUserBody
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 * @property {string} role
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
  async ({ lang, user, ...request }: Request, response: Response) => {
    try {
      await updateUserSchema.validate(request, { abortEarly: false });

      const { email, name, phone, password, role } = request.body as Body;

      const userData = await userRepository.findOne({
        select: { id: true, role: true },
        where: { companyId: user.company.id, id: toNumber(request.params.id) }
      });

      if (!userData) return notFound({ entity: messages[lang].entity.user, lang, response });

      const isEditingOwnAccount = user.id === userData.id;

      const isAllowedToEdit =
        !isEditingOwnAccount && canChangeRoles[user.role]?.includes(userData.role);

      if (!isAllowedToEdit) {
        return forbidden({ lang, response });
      }

      let newName: string | undefined;
      let newPhone: string | undefined;
      let newRole: Role | undefined;
      let newPassword: string | undefined;
      let newEmail: string | undefined;

      if (typeof name === 'string' && name.length >= 1) newName = name;
      if (typeof phone === 'string' && phone.length >= 1) newPhone = phone.replace(/\D/gu, '');
      if (typeof password === 'string' && password.length >= 8)
        newPassword = await hash(password, env.HASH_SALT);

      if (!isEditingOwnAccount && typeof email === 'string' && email.length > 1) {
        newEmail = email;
      }

      if (!isEditingOwnAccount && typeof role === 'string') {
        if (
          Object.values(Role).includes(role as Role) &&
          canChangeRoles[user.role]?.includes(role as Role)
        ) {
          newRole = role as Role;
        }
      }

      await userRepository.update(
        { id: userData.id },
        { email: newEmail, name: newName, phone: newPhone, role: newRole, password: newPassword }
      );

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
