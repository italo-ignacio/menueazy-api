import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, ok } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantId}
 * @summary Delete Restaurant
 * @tags Restaurant
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteRestaurantController: Controller =
  () =>
  async ({ lang, restaurant }: Request, response: Response) => {
    try {
      await restaurantRepository.update({ id: restaurant.id }, { finishedAt: new Date() });

      return ok({ payload: messages[lang].default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages[lang].error.notFound, lang, response });
    }
  };
