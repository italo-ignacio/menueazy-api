import { finishedAt } from '@application/helper';
import { insertRestaurantSchema } from '@data/validation';
import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { CategoryEntity } from '@entity/category';
import { RestaurantEntity } from '@entity/restaurant';
import { UserEntity } from '@entity/user';
import { UserRestaurantEntity } from '@entity/user-restaurant';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { badRequest, created, errorLogger, messageErrorResponse } from '@main/utils';
import { restaurantRepository } from '@repository/restaurant';
import { subscriptionRepository } from '@repository/subscription';
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
  async ({ lang, user, ...request }: Request, response: Response) => {
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

      const subscription = await subscriptionRepository.findOne({
        select: { id: true, restaurantLimit: true },
        where: { company: { id: user.company.id } }
      });

      if (!subscription) return badRequest({ lang, response });

      const restaurantCount = await restaurantRepository.count({
        where: { companyId: user.company.id, finishedAt }
      });

      if (subscription.restaurantLimit > restaurantCount)
        return badRequest({ message: messages[lang].error.maxRestaurant, lang, response });

      await DataSource.transaction(async (manager) => {
        const restaurant = manager.create(RestaurantEntity, {
          name,
          companyId: user.company.id,
          contactLink,
          description,
          hasDelivery,
          maxDeliveryDistanceInKm,
          minimumDeliveryPrice,
          minimumOrderPrice,
          phone,
          priceByKmInDelivery,
          restaurantUrl
        });

        await manager.save(restaurant);

        const usersOwner = await manager.find(UserEntity, {
          select: { id: true },
          where: { finishedAt, role: Role.OWNER, companyId: user.company.id }
        });

        await manager.insert(
          UserRestaurantEntity,
          usersOwner.map((user) => ({ restaurant, user }))
        );

        await manager.insert(CategoryEntity, {
          name: messages[lang].default.other,
          restaurant
        });
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
