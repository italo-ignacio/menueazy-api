import { updateOpeningHourSchema } from '@data/validation';
import { DaysOfWeek } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { OpeningHourEntity } from '@entity/opening-hour';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, ok, toNumber } from '@main/utils';
import type { Request, Response } from 'express';

interface Body {
  closingTime: string;
  dayOfWeek: DaysOfWeek;
  openingTime: string;
}

/**
 * @typedef {object} UpdateOpeningHourBody
 * @property {string} closingTime.required
 * @property {string} dayOfWeek.required -enum:MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY
 * @property {string} openingTime.required
 */

/**
 * PUT /restaurant/{restaurantId}/opening-hour/{id}
 * @summary Update Opening Hour
 * @tags Opening Hour
 * @security BearerAuth
 * @param {UpdateOpeningHourBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateOpeningHourController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await updateOpeningHourSchema.validate(request, { abortEarly: false });

      const { closingTime, dayOfWeek, openingTime } = request.body as Body;

      await DataSource.createQueryBuilder()
        .update(OpeningHourEntity)
        .set({ closingTime, dayOfWeek, openingTime })
        .where('id = :id', { id: toNumber(request.params.id) })
        .andWhere('restaurant_id = :restaurantId', { restaurantId: restaurant.id })
        .execute();

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
