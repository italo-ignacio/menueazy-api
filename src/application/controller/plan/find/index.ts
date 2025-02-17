import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { badRequest, errorLogger, messageErrorResponse, ok } from '@main/utils';
import { planRepository } from '@repository/plan';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindPlanPayload
 * @property {array<Plan>} content
 * @property {number} totalElements
 * @property {number} totalPages
 */

/**
 * @typedef {object} FindPlanResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindPlanPayload} payload
 */

/**
 * GET /plan
 * @summary Find Plan
 * @tags Plan
 * @param {string} currencyCode.query.required
 * @return {FindPlanResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const findPlanController: Controller =
  () =>
  async ({ query, lang }: Request, response: Response) => {
    try {
      const { currencyCode } = query as { currencyCode: string };
      const code = String(currencyCode)?.toUpperCase();

      if (code !== 'BRL' && code !== 'USD' && code !== 'EUR')
        return badRequest({
          lang,
          response,
          message: messages[lang].error.selectAValidCurrencyType
        });

      const planFindParams = [
        'p.id',
        'p.name',
        'p.description',
        'p.minimumOfRestaurant',
        'p.minimumOfProduct',
        'p.createdAt',
        'p.updatedAt',
        'p.finishedAt',
        'ppl.id',
        'ppl.monthlyPrice',
        'ppl.priceOfRestaurant',
        'ppl.priceOfProduct',
        'ppl.discount',
        'ppl.period',
        'c.id',
        'c.code',
        'c.name',
        'c.symbol'
      ];

      const queryBuilder = planRepository
        .createQueryBuilder('p')
        .leftJoin('p.planPriceList', 'ppl')
        .leftJoin('ppl.currency', 'c')
        .where('c.code = :code', { code })
        .orWhere('ppl.id IS NULL AND p.name = :premiumPlan', {
          premiumPlan: 'Premium'
        })
        .select(planFindParams);

      const content = await queryBuilder.getMany();

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
