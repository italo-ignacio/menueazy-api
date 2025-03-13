import { finishedAt } from '@application/helper';
import { updateCategoryOrderSchema } from '@data/validation';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { messages } from '@i18n/index';
import { cache } from '@infra/redis';
import { badRequest, errorLogger, messageErrorResponse, ok } from '@main/utils';
import { categoryRepository } from '@repository/category';
import type { Request, Response } from 'express';

interface Body {
  categoryList: { id: number; order: number }[];
}

/**
 * @typedef {object} CategoryOrderListBody
 * @property {integer} id.required
 * @property {integer} order.required
 */

/**
 * @typedef {object} UpdateCategoryOrderBody
 * @property {array<CategoryOrderListBody>} categoryList.required
 */

/**
 * PUT /restaurant/{restaurantId}/category/order
 * @summary Update Category Order
 * @tags Category
 * @security BearerAuth
 * @param {UpdateCategoryOrderBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateCategoryOrderController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    try {
      let error = 0;

      await updateCategoryOrderSchema.validate(request, { abortEarly: false });

      const { categoryList } = request.body as Body;

      const formattedById = categoryList.sort((a, b) => a.id - b.id);
      const formattedByOrder = categoryList.sort((a, b) => a.order - b.order);

      if (!formattedByOrder?.length)
        return badRequest({ lang, response, message: messages[lang].error.invalidOrderValue });

      if (
        formattedByOrder[0].order !== 1 ||
        formattedByOrder[formattedByOrder.length - 1].order !== formattedByOrder.length
      )
        return badRequest({ lang, response, message: messages[lang].error.invalidOrderValue });

      const categories = await categoryRepository.find({
        select: { id: true, order: true },
        where: { finishedAt, restaurantId: restaurant.id },
        order: { id: 'ASC' }
      });

      if (categories.length !== formattedById.length)
        return badRequest({ lang, response, message: messages[lang].error.invalidOrderValue });

      const newData: { id: number; order: number }[] = [];

      let oldOrder = 0;

      formattedById.forEach((item, index) => {
        if (item.id !== categories[index].id) error = 1;

        const item2 = formattedByOrder[index];

        if (oldOrder >= item2.order) error = 1;

        oldOrder = item2.order;

        newData.push({ id: item2.id, order: item2.order });
      });

      if (error === 1)
        return badRequest({ lang, response, message: messages[lang].error.invalidOrderValue });

      await categoryRepository.save(newData);

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, lang, response });
    }
  };
