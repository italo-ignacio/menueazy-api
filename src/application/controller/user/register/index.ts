import { finishedAt } from '@application/helper';
import { registerRequestFindParams, subscriptionFindParams } from '@data/search';
import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { LoginToken } from '@domain/token';
import { CompanyEntity } from '@entity/company';
import { UserEntity } from '@entity/user';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { env } from '@main/config';
import { badRequest, created, errorLogger, isUuid, messageErrorResponse } from '@main/utils';
import { registerRequestRepository } from '@repository/register-request';
import { subscriptionRepository } from '@repository/subscription';
import type { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

interface Body {
  userIdToken: string;
  companyUrl: string;
  code: string;
}

/**
 * @typedef {object} UserRegisterResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /user/register
 * @summary Register User
 * @tags User
 * @param {object} request.body.required - application/json
 * @return {UserRegisterResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const userRegisterController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const { userIdToken, code, companyUrl } = request.body as Body;

      if (!userIdToken || !isUuid(code) || !companyUrl)
        return badRequest({ message: messages[lang].error.badCredentials, lang, response });

      const { aud, email, iss, user_id } = decode(userIdToken ?? ``) as LoginToken;

      if (!email || !user_id || aud !== env.FIREBASE.AUD || iss !== env.FIREBASE.ISS)
        return badRequest({ message: messages[lang].error.badCredentials, lang, response });

      const firebaseId = user_id;

      const registerRequest = await registerRequestRepository.findOne({
        select: registerRequestFindParams,
        where: { code, finishedAt }
      });

      if (registerRequest === null)
        return badRequest({ message: messages[lang].error.badCredentials, lang, response });

      if (!registerRequest.canRegister)
        return badRequest({ message: messages[lang].error.underReview, lang, response });

      const subscription = await subscriptionRepository.findOne({
        select: subscriptionFindParams,
        where: { code, finishedAt }
      });

      if (subscription === null)
        return badRequest({ message: messages[lang].error.badCredentials, lang, response });

      await DataSource.transaction(async (manager) => {
        const company = manager.create(CompanyEntity, {
          companyUrl,
          currency: { id: registerRequest.currency.id },
          name: registerRequest.companyName,
          subscription: { id: subscription.id }
        });

        await manager.save(company);

        const user = manager.create(UserEntity, {
          name: registerRequest.name,
          email: registerRequest.email,
          firebaseId,
          phone: registerRequest.phone,
          role: Role.OWNER,
          company
        });

        await manager.save(user);

        registerRequest.finishedAt = new Date();
        await manager.save(registerRequest);
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
