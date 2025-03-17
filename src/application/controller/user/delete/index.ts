import { canChangeUser } from '@application/helper';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, forbidden, notFound, ok, toNumber } from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';

/**
 * DELETE /user/{id}
 * @summary Delete User
 * @tags User
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteUserController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const canChange = await canChangeUser(request.user, request.params.id);

      if (canChange === null)
        return notFound({ entity: messages[lang].entity.user, lang, response });

      if (canChange === false) return forbidden({ lang, response });

      await userRepository.update({ id: toNumber(request.params.id) }, { finishedAt: new Date() });

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ lang, response });
    }
  };
