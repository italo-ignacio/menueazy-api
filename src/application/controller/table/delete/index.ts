import { messages } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { TableEntity } from '@entity/table';
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import type { Request, Response } from 'express';

/**
 * DELETE /restaurant/{restaurantUrl}/table/{id}
 * @summary Delete Table
 * @tags Table
 * @security BearerAuth
 * @param {string} restaurantUrl.path.required
 * @param {integer} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const deleteTableController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await DataSource.createQueryBuilder()
        .update(TableEntity)
        .set({ finishedAt: new Date() })
        .where('id = :id', { id: Number(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: request.restaurant.id })
        .execute();

      return ok({ payload: messages.default.successfullyDeleted, lang, response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages.auth.notFound, lang, response });
    }
  };
