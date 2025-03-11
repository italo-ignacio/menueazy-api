import { finishedAt } from '@application/helper';
import { userFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { errorLogger, forbidden, messageErrorResponse, ok } from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';

interface Body {
  companyUrl: string;
}

/**
 * @typedef {object} CheckUserCompanyBody
 * @property {string} companyUrl.required
 */

/**
 * @typedef {object} CheckUserCompanyPayload
 * @property {boolean} canAccess.required
 */

/**
 * @typedef {object} CheckUserCompanyResponse
 * @property {string} message
 * @property {string} status
 * @property {CheckUserCompanyPayload} payload
 */

/**
 * POST /user/check-company
 * @summary Check User Company
 * @tags User
 * @security BearerAuth
 * @param {CheckUserCompanyBody} request.body.required - application/json
 * @return {CheckUserCompanyResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const checkUserCompanyController: Controller =
  () =>
  async ({ lang, user, body }: Request, response: Response) => {
    try {
      const { companyUrl } = body as Body;

      if (typeof companyUrl !== 'string') return forbidden({ lang, response });

      const userDb = await userRepository.findOne({
        select: {
          ...userFindParams,
          company: {
            id: true,
            name: true,
            companyUrl: true
          }
        },
        relations: { company: true },
        where: {
          id: user.id,
          company: { companyUrl, finishedAt },
          finishedAt
        }
      });

      return ok({ payload: { canAccess: true, user: userDb }, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
