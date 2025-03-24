import { insertAddressSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { AddressEntity } from '@entity/address';
import { ClientAddressEntity } from '@entity/client-address';
import { DataSource } from '@infra/database';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import type { Request, Response } from 'express';

interface Body {
  city: string;
  country: string;
  number: string;
  state: string;
  street: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  complement?: string;
}

/**
 * @typedef {object} InsertClientAddressBody
 * @property {string} city.required
 * @property {string} country.required
 * @property {string} number.required
 * @property {string} state.required
 * @property {string} street.required
 * @property {string} zipCode.required
 * @property {string} latitude.required
 * @property {string} longitude.required
 * @property {string} complement
 */

/**
 * POST /client/address
 * @summary Insert Client Address
 * @tags Client Address
 * @security BearerAuth
 * @param {InsertClientAddressBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertClientAddressController: Controller =
  () =>
  async ({ lang, client, ...request }: Request, response: Response) => {
    try {
      await insertAddressSchema.validate(request, { abortEarly: false });

      const { city, country, latitude, longitude, number, state, street, zipCode, complement } =
        request.body as Body;

      await DataSource.transaction(async (manager) => {
        const address = manager.create(AddressEntity, {
          city,
          country,
          latitude,
          longitude,
          number,
          state,
          street,
          zipCode,
          complement
        });

        await manager.save(address);

        await manager.insert(ClientAddressEntity, { address, client: { id: client.id } });
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
