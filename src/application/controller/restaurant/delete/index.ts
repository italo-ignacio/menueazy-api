import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { badRequest, errorLogger, ok } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantUrl}
 * @summary Delete Restaurant
 * @tags Restaurant
 * @security BearerAuth
 * @param {string} restaurantUrl.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteRestaurantController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await restaurantRepository.update(
        { restaurantUrl: request.params.restaurantUrl },
        { finishedAt: new Date() }
      );

      return ok({ payload: messages.default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages.auth.notFound, lang, response });
    }
  };
