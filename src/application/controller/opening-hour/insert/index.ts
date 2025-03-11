import { insertOpeningHourSchema } from '@data/validation';
import { DaysOfWeek } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import { openingHourRepository } from '@repository/opening-hour';
import type { Request, Response } from 'express';

interface Body {
  daysOfWeek: {
    closingTime: string;
    dayOfWeek: DaysOfWeek;
    openingTime: string;
  }[];
}

/**
 * @typedef {object} InsertOpeningHourListBody
 * @property {string} closingTime.required
 * @property {string} dayOfWeek.required -enum:MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY
 * @property {string} openingTime.required
 */

/**
 * @typedef {object} InsertOpeningHourBody
 * @property {array<InsertOpeningHourListBody>} daysOfWeek.required
 */

/**
 * @typedef {object} InsertOpeningHourResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /restaurant/{restaurantId}/opening-hour
 * @summary Insert Opening Hour
 * @tags Opening Hour
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertOpeningHourBody} request.body.required - application/json
 * @return {InsertOpeningHourResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertOpeningHourController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      await insertOpeningHourSchema.validate(request, { abortEarly: false });

      const { daysOfWeek } = request.body as Body;

      const data = daysOfWeek.map((item) => ({
        closingTime: item.closingTime,
        dayOfWeek: item.dayOfWeek,
        openingTime: item.openingTime,
        restaurantId: restaurant.id
      }));

      await openingHourRepository.insert(data);

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
