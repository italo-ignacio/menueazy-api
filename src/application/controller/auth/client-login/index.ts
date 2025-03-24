import { finishedAt } from '@application/helper';
import { clientFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { LoginToken } from '@domain/token';
import { messages } from '@i18n/index';
import { env } from '@main/config';
import {
  badRequest,
  errorLogger,
  generateClientToken,
  messageErrorResponse,
  ok,
  unauthorized
} from '@main/utils';
import { clientRepository } from '@repository/client';
import type { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

interface Body {
  userIdToken?: string;
}

/**
 * @typedef {object} ClientLoginPayload
 * @property {string} accessToken.required
 * @property {Client} client.required
 */

/**
 * @typedef {object} ClientLoginResponse
 * @property {string} message
 * @property {string} status
 * @property {ClientLoginPayload} payload
 */

/**
 * POST /auth/client/login
 * @summary Login
 * @tags Auth
 * @return {ClientLoginResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const clientLoginController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const { userIdToken } = request.body as Body;

      if (!userIdToken)
        return unauthorized({ message: messages[lang].error.badLoginCredentials, lang, response });

      const { aud, email, email_verified, iss, user_id } = decode(userIdToken ?? ``) as LoginToken;

      if (!aud || !email || !iss || !user_id)
        return unauthorized({ message: messages[lang].error.badLoginCredentials, lang, response });

      if (aud !== env.FIREBASE.AUD || iss !== env.FIREBASE.ISS)
        return unauthorized({ message: messages[lang].error.badLoginCredentials, lang, response });

      if (!email_verified)
        return badRequest({
          message: messages[lang].error.checkYourEmail,
          lang,
          response,
          errors: { sendEmailToVerification: true }
        });

      const client = await clientRepository.findOne({
        select: clientFindParams,
        where: { email, finishedAt }
      });

      if (client === null || client.firebaseId !== user_id)
        return unauthorized({ lang, message: messages[lang].error.notFound, response });

      const { accessToken } = generateClientToken({
        id: client.id,
        firebaseId: client.firebaseId,
        isBlocked: client.isBlocked,
        email: client.email
      });

      return ok({ payload: { accessToken, client }, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
