import { finishedAt } from '@application/helper';
import { tableFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, isUuid, messageErrorResponse, notFound, ok } from '@main/utils';
import { tableRepository } from '@repository/table';
import type { Request, Response } from 'express';

/**
 * GET /table/{code}
 * @summary Find One Table
 * @tags Table
 * @param {string} code.path.required
 * @return {FindOneTableResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findTableByCodeController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const code = request.params.code;

      if (!isUuid(code)) return notFound({ entity: messages[lang].entity.table, lang, response });

      const payload = await tableRepository.findOne({
        select: tableFindParams,
        where: { code, finishedAt }
      });

      if (payload === null)
        return notFound({ entity: messages[lang].entity.table, lang, response });

      return ok({ payload, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
