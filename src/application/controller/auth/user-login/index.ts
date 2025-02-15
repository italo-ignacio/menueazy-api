import { userFindParams } from '@data/search';
import type { Controller } from '@domain/protocols';
import { LoginToken } from '@domain/token';
import { messages } from '@i18n/index';
import { env } from '@main/config';
import { badRequest, errorLogger, generateToken, messageErrorResponse, ok } from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

interface Body {
  userIdToken: string;
}

/**
 * @typedef {object} UserLoginPayload
 * @property {string} accessToken.required
 * @property {User} user.required
 */

/**
 * @typedef {object} UserLoginResponse
 * @property {Messages} message
 * @property {string} status
 * @property {UserLoginPayload} payload
 */

/**
 * POST /auth/user-login
 * @summary User Login
 * @tags A Auth
 * @param {object} request.body.required - application/json
 * @return {UserLoginResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const userLoginController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      const { userIdToken } = request.body as Body;

      const { aud, email, email_verified, iss, user_id } = decode(userIdToken ?? ``) as LoginToken;

      if (!aud || !email || !iss || !user_id)
        return badRequest({ message: messages[lang].error.badLoginCredentials, lang, response });

      if (aud !== env.FIREBASE.AUD || iss !== env.FIREBASE.ISS)
        return badRequest({ message: messages[lang].error.badLoginCredentials, lang, response });

      if (!email_verified) return ok({ payload: { sendEmailVerification: true }, lang, response });

      const firebaseId = email === env.ADMIN.email ? undefined : user_id;

      const user = await userRepository.findOne({
        select: {
          ...userFindParams,
          company: {
            id: true,
            name: true,
            companyUrl: true
          }
        },
        relations: { company: true },
        where: { email, firebaseId }
      });

      if (user === null)
        return badRequest({ message: messages[lang].error.badLoginCredentials, lang, response });

      if (email === env.ADMIN.email && user.firebaseId === env.ADMIN.firebaseId) {
        await userRepository.update({ firebaseId: env.ADMIN.firebaseId }, { firebaseId: user_id });
        Object.assign(user, { ...user, firebaseId: user_id });
      }

      const { accessToken } = generateToken({
        id: user.id,
        firebaseId: user.firebaseId,
        email: user.email,
        role: user.role,
        companyId: user.company.id
      });

      return ok({ payload: { accessToken, user }, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
