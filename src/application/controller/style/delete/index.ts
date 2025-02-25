import { canDeleteStyle } from '@application/helper';
import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { badRequest, errorLogger, forbidden, ok } from '@main/utils';
import { styleRepository } from '@repository/style';
import type { Request, Response } from 'express';

/**
 * DELETE /style/{id}
 * @summary Delete Style
 * @tags Style
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteStyleController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      if (!canDeleteStyle(request as Request)) return forbidden({ lang, response });

      await styleRepository.update({ id: Number(request.params.id) }, { finishedAt: new Date() });

      return ok({ payload: messages.default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages.auth.notFound, lang, response });
    }
  };
