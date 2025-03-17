import { finishedAt } from '@application/helper';
import { insertUserSchema } from '@data/validation';
import { canChangeRoles, Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { RestaurantEntity } from '@entity/restaurant';
import { UserEntity } from '@entity/user';
import { UserRestaurantEntity } from '@entity/user-restaurant';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { env } from '@main/config';
import {
  created,
  errorLogger,
  forbidden,
  messageErrorResponse,
  notFound,
  toNumber
} from '@main/utils';
import { hash } from 'bcrypt';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
  restaurantId?: number;
}

/**
 * @typedef {object} InsertUserBody
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role.required
 * @property {string} phone.required
 * @property {integer} restaurantId
 */

/**
 * POST /user
 * @summary Insert User
 * @tags User
 * @security BearerAuth
 * @param {InsertUserBody} request.body.required
 * @return {CreatedResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const insertUserController: Controller =
  () =>
  async ({ lang, user, ...request }: Request, response: Response) => {
    let err = 0;

    try {
      await insertUserSchema.validate(request, { abortEarly: false });

      const { email, name, phone, role, password, restaurantId } = request.body as Body;

      const hashPassword = await hash(password, env.HASH_SALT);

      const userRole = canChangeRoles[user.role].find((item) => item === role);

      if (!userRole) return forbidden({ lang, response });

      await DataSource.transaction(async (manager) => {
        const userData = manager.create(UserEntity, {
          email,
          password: hashPassword,
          name,
          company: { id: user.company.id },
          role,
          phone: phone.replace(/\D/gu, '')
        });

        await manager.save(userData);

        if (toNumber(restaurantId) !== -1) {
          const restaurant = await manager.findOne(RestaurantEntity, {
            select: { id: true },
            where: { finishedAt, id: toNumber(restaurantId), companyId: user.company.id }
          });

          if (!restaurant) {
            err = 1;
            throw new Error('');
          }

          await manager.insert(UserRestaurantEntity, { user: userData, restaurant });
        }
      });

      return created({ response, lang });
    } catch (error) {
      errorLogger(error);

      if (err === 1) return notFound({ entity: messages[lang].entity.restaurant, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
