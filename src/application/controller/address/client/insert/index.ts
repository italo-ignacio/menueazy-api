import { insertRestaurantSchema } from '@data/validation';
import type { Controller } from '@domain/protocols';
import { RestaurantEntity } from '@entity/restaurant';
import { StyleEntity } from '@entity/style';
import { UserRestaurantEntity } from '@entity/user-restaurant';
import { DataSource } from '@infra/database';
import { created, errorLogger, messageErrorResponse } from '@main/utils';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  phone: string;
  restaurantUrl: string;
  hasDelivery: boolean;
  minimumOrderPrice: number;
  contactLink?: string;
  description?: string;
  maxDeliveryDistanceInKm?: number;
  minimumDeliveryPrice?: number;
  priceByKmInDelivery?: number;
}

/**
 * @typedef {object} InsertRestaurantBody
 * @property {string} name.required
 * @property {string} phone.required
 * @property {string} restaurantUrl.required
 * @property {boolean} hasDelivery.required
 * @property {number} minimumOrderPrice.required
 * @property {string} contactLink
 * @property {string} description
 * @property {number} maxDeliveryDistanceInKm
 * @property {number} minimumDeliveryPrice
 * @property {number} priceByKmInDelivery
 */

/**
 * POST /restaurant
 * @summary Insert Restaurant
 * @tags Restaurant
 * @security BearerAuth
 * @param {InsertRestaurantBody} request.body.required - application/json
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertRestaurantController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    try {
      await insertRestaurantSchema.validate(request, { abortEarly: false });

      const {
        name,
        hasDelivery,
        minimumOrderPrice,
        phone,
        restaurantUrl,
        contactLink,
        description,
        maxDeliveryDistanceInKm,
        minimumDeliveryPrice,
        priceByKmInDelivery
      } = request.body as Body;

      await DataSource.transaction(async (manager) => {
        const style = await manager.findOne(StyleEntity, { where: { generic: true } });

        if (!style) throw new Error();

        const restaurant = manager.create(RestaurantEntity, {
          name,
          companyId: request.user.company.id,
          contactLink,
          description,
          hasDelivery,
          maxDeliveryDistanceInKm,
          minimumDeliveryPrice,
          minimumOrderPrice,
          open: false,
          phone,
          priceByKmInDelivery,
          restaurantUrl,
          style
        });

        await manager.save(restaurant);

        const userRestaurant = manager.create(UserRestaurantEntity, {
          restaurant,
          userId: request.user.id
        });

        await manager.save(userRestaurant);
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
