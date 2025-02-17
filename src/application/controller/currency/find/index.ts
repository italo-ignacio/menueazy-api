import { currencyFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { errorLogger, messageErrorResponse, ok } from '@main/utils';
import { currencyRepository } from '@repository/currency';
import type { Request, Response } from 'express';
import { IsNull } from 'typeorm';

/**
 * @typedef {object} FindCurrencyPayload
 * @property {array<Currency>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindCurrencyResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindCurrencyPayload} payload
 */

/**
 * GET /currency
 * @summary Find Currency
 * @tags Currency
 * @return {FindCurrencyResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findCurrencyController: Controller =
  () =>
  async ({ lang }: Request, response: Response) => {
    try {
      const content = await currencyRepository.find({
        select: currencyFindParams,
        where: { finishedAt: IsNull() }
      });

      return ok({
        payload: { content },
        lang,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
