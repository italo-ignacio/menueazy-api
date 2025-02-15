import { insertRegisterRequestSchema } from '@data/validation/auth';
import type { Controller } from '@domain/protocols';
import { created, errorLogger, messageErrorResponse, validationErrorResponse } from '@main/utils';
import { registerRequestRepository } from '@repository/register-request';
import type { Request, Response } from 'express';
import { ValidationError } from 'yup';

interface Body {
  email: string;
  name: string;
  phone: string;
  companyName: string;
  description?: string;
  currencyId: number;
}

/**
 * @typedef {object} InsertRegisterBody
 * @property {string} email.required
 * @property {string} name.required
 * @property {string} phone.required
 * @property {string} companyName.required
 * @property {integer} currencyId.required
 * @property {string} description
 */

/**
 * @typedef {object} InsertRegisterResponse
 * @property {Messages} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /register-request
 * @summary Insert Register Request
 * @tags Register Request
 * @param {InsertRegisterBody} request.body.required - application/json
 * @return {InsertRegisterResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertRegisterRequestController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertRegisterRequestSchema.validate(request, { abortEarly: false });

      const { email, companyName, currencyId, name, phone, description } = request.body as Body;

      await registerRequestRepository.insert({
        email,
        companyName,
        name,
        phone,
        currency: { id: currencyId },
        description
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError)
        return validationErrorResponse({ error, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
