import { finishedAt } from '@application/helper';
import { updateAddressSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import { addressRepository } from '@repository/address';
import { clientAddressRepository } from '@repository/client-address';
import type { Request, Response } from 'express';

interface Body {
  city?: string;
  country?: string;
  number?: string;
  state?: string;
  street?: string;
  zipCode?: string;
  latitude?: string;
  longitude?: string;
  complement?: string;
}

/**
 * @typedef {object} UpdateClientAddressBody
 * @property {string} city
 * @property {string} country
 * @property {string} number
 * @property {string} state
 * @property {string} street
 * @property {string} zipCode
 * @property {string} latitude
 * @property {string} longitude
 * @property {string} complement
 */

/**
 * PUT /client/address/{id}
 * @summary Update Client Address
 * @tags Client Address
 * @security BearerAuth
 * @param {UpdateClientAddressBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateClientAddressController: Controller =
  () =>
  async ({ lang, client, ...request }: Request, response: Response) => {
    try {
      await updateAddressSchema.validate(request, { abortEarly: false });

      const { city, complement, country, latitude, longitude, number, state, street, zipCode } =
        request.body as Body;

      const clientAddress = await clientAddressRepository.findOne({
        select: { id: true, addressId: true },
        where: { finishedAt, addressId: toNumber(request.params.id), clientId: client.id }
      });

      if (!clientAddress)
        return notFound({ lang, entity: messages[lang].entity.address, response });

      await addressRepository.update(
        { id: clientAddress.addressId },
        { city, complement, country, latitude, longitude, number, state, street, zipCode }
      );

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
