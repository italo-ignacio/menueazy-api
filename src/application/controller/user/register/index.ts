import { planFindParams, planPriceFindParams } from '@data/search';
import { registerUserSchema } from '@data/validation';
import { Role } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import { CompanyEntity } from '@entity/company';
import { PlanEntity } from '@entity/plan';
import { PlanPriceEntity } from '@entity/plan-price';
import { SubscriptionEntity } from '@entity/subscription';
import { UserEntity } from '@entity/user';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { env } from '@main/config';
import { created, errorLogger, messageErrorResponse, notFound } from '@main/utils';
import { hash } from 'bcrypt';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  companyUrl: string;
  currencyId: number;
  planId: number;
}

/**
 * @typedef {object} UserRegisterBody
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} phone.required
 * @property {string} companyName.required
 * @property {string} companyUrl.required
 * @property {number} currencyId.required
 * @property {number} planId.required
 */

/**
 * @typedef {object} UserRegisterResponse
 * @property {string} message
 * @property {string} status
 * @property {string} payload
 */

/**
 * POST /user/register
 * @summary Register User
 * @tags User
 * @param {UserRegisterBody} request.body.required - application/json
 * @return {UserRegisterResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const userRegisterController: Controller =
  () =>
  async ({ lang, ...request }: Request, response: Response) => {
    let err = 0;

    try {
      await registerUserSchema.validate(request, { abortEarly: false });

      const { companyName, companyUrl, password, currencyId, email, name, phone, planId } =
        request.body as Body;

      await DataSource.transaction(async (manager) => {
        const plan = await manager.findOne(PlanEntity, {
          select: planFindParams,
          where: { id: planId }
        });

        if (!plan) {
          err = 1;
          throw new Error();
        }

        const planPrice = await manager.findOne(PlanPriceEntity, {
          select: planPriceFindParams,
          where: { planId: plan.id, currencyId }
        });

        if (!planPrice) {
          err = 1;
          throw new Error();
        }

        const subscription = manager.create(SubscriptionEntity, {
          price: planPrice.monthlyPrice,
          productLimit: plan.minimumOfProduct,
          restaurantLimit: plan.minimumOfRestaurant,
          expiresAt: new Date(new Date().setDate(new Date().getDate() + 15)),
          plan
        });

        await manager.save(subscription);

        const company = manager.create(CompanyEntity, {
          companyUrl,
          currency: { id: currencyId },
          name: companyName,
          subscription
        });

        await manager.save(company);

        const hashPassword = await hash(password, env.HASH_SALT);

        const user = manager.create(UserEntity, {
          name,
          email,
          phone,
          password: hashPassword,
          role: Role.OWNER,
          company
        });

        await manager.save(user);
      });

      return created({ lang, response });
    } catch (error) {
      errorLogger(error);

      if (err === 1) return notFound({ entity: messages[lang].entity.plan, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
