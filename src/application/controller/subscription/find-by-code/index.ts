import { subscriptionFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, isUuid, messageErrorResponse, notFound, ok } from '@main/utils';
import { subscriptionRepository } from '@repository/subscription';
import type { Request, Response } from 'express';
import { IsNull } from 'typeorm';

/**
 * @typedef {object} FindOneSubscriptionResponse
 * @property {string} message
 * @property {string} status
 * @property {Subscription} payload
 */

/**
 * GET /subscription/{code}/code
 * @summary Find Subscription by Code
 * @tags Subscription
 * @param {string} code.path.required
 * @return {FindOneSubscriptionResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findSubscriptionByCodeController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      if (!isUuid(request.params.code))
        return notFound({ entity: messages[lang].entity.subscription, lang, response });

      const payload = await subscriptionRepository.findOne({
        select: subscriptionFindParams,
        where: { code: request.params.code, finishedAt: IsNull() }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.subscription, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
