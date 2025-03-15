import { finishedAt } from '@application/helper';
import { updateAddressSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import { addressRepository } from '@repository/address';
import { restaurantRepository } from '@repository/restaurant';
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
 * @typedef {object} UpdateRestaurantAddressBody
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
 * PUT /restaurant/{restaurantId}/address
 * @summary Update Restaurant Address
 * @tags Restaurant Address
 * @security BearerAuth
 * @param {UpdateRestaurantAddressBody} request.body
 * @param {integer} restaurantId.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateRestaurantAddressController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await updateAddressSchema.validate(request, { abortEarly: false });

      const { city, complement, country, latitude, longitude, number, state, street, zipCode } =
        request.body as Body;

      const restaurant = await restaurantRepository.findOne({
        select: { id: true, addressId: true },
        where: { id: request.restaurant.id, finishedAt }
      });

      if (!restaurant)
        return notFound({ lang, entity: messages[lang].entity.restaurant, response });

      if (!restaurant?.addressId)
        return notFound({ lang, entity: messages[lang].entity.address, response });

      await addressRepository.update(
        { id: restaurant.addressId },
        { city, complement, country, latitude, longitude, number, state, street, zipCode }
      );

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
