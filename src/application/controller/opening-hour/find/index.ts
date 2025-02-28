import { finishedAt } from '@application/helper';
import { openingHourFindParams } from '@data/search';
import { DaysOfWeek } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import { openingHourRepository } from '@repository/opening-hour';
import { type Request, type Response } from 'express';

/**
 * @typedef {object} FindOpeningHourResponse
 * @property {string} message
 * @property {string} status
 * @property {array<OpeningHour>} payload
 */

/**
 * GET /restaurant/{restaurantId}/opening-hour
 * @summary Find Opening Hour
 * @tags Opening Hour
 * @param {integer} restaurantId.path.required
 * @return {FindOpeningHourResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findOpeningHourController: Controller =
  () =>
  async ({ lang, restaurant }: Request, response: Response) => {
    try {
      const orderMap: Record<DaysOfWeek, number> = {
        SUNDAY: 1,
        MONDAY: 2,
        TUESDAY: 3,
        WEDNESDAY: 4,
        THURSDAY: 5,
        FRIDAY: 6,
        SATURDAY: 7
      };

      const openingHours = await openingHourRepository.find({
        select: openingHourFindParams,
        where: { restaurantId: restaurant.id, finishedAt }
      });

      const sortedOpeningHours = openingHours.sort(
        (a, b) => orderMap[a.dayOfWeek] - orderMap[b.dayOfWeek]
      );

      return ok({ payload: sortedOpeningHours, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
