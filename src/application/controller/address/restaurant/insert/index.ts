import { insertAddressSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { AddressEntity } from '@entity/address';
import { RestaurantEntity } from '@entity/restaurant';
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
 * @typedef {object} InsertRestaurantAddressBody
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
 * @typedef {object} InsertRestaurantAddressResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /restaurant/{restaurantId}/address
 * @summary Insert Restaurant Address
 * @tags Restaurant Address
 * @security BearerAuth
 * @param {integer} restaurantId.path.required
 * @param {InsertRestaurantAddressBody} request.body.required - application/json
 * @return {InsertRestaurantAddressResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertRestaurantAddressController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
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

        await manager.update(
          RestaurantEntity,
          { id: request.restaurant.id },
          { addressId: address.id }
        );
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
