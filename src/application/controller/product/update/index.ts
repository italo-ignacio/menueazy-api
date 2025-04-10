import { findOneFullProduct, finishedAt } from '@application/helper';
import { updateProductSchema } from '@data/validation';
import { cacheKeys } from '@domain/helpers';
import type { Controller } from '@domain/protocols';
import { CategoryEntity } from '@entity/category';
import { ProductEntity } from '@entity/product';
import { ProductCategoryEntity } from '@entity/product-category';
import { ProductOptionGroupEntity } from '@entity/product-option-group';
import { ProductOptionItemEntity } from '@entity/product-option-item';
import { messages } from '@i18n/index';
import { DataSource } from '@infra/database';
import { cache } from '@infra/redis';
import { errorLogger, messageErrorResponse, notFound, ok, toNumber } from '@main/utils';
import type { Request, Response } from 'express';
import { In } from 'typeorm';

interface Body {
  name: string;
  price: number;
  description?: string;
  inStock?: boolean;
  published?: boolean;
  highlight?: boolean;
  discount?: number;
  startDiscountAt?: Date;
  finishDiscountAt?: Date;
  onlyInRestaurant?: boolean;
  priceByKmInDelivery?: number;

  productOptionGroupList?: {
    id?: number;
    name?: string;
    description?: string;
    minSelection?: number;
    maxSelection?: number;
    required?: boolean;
    productOptionItemList: {
      id?: number;
      name?: string;
      description?: string;
      imageUrl?: string;
      additionalPrice?: number;
    }[];
  }[];

  categoryList?: { id: number }[];
}

/**
 * @typedef {object} UpdateProductOptionItemListData
 * @property {integer} id
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 * @property {number} additionalPrice
 */

/**
 * @typedef {object} UpdateProductOptionGroupListData
 * @property {integer} id
 * @property {string} name
 * @property {string} description
 * @property {string} minSelection
 * @property {string} maxSelection
 * @property {string} required
 * @property {array<UpdateProductOptionItemListData>} productOptionItemList
 */

/**
 * @typedef {object} UpdateCategoryListBody
 * @property {number} id
 */

/**
 * @typedef {object} UpdateProductBody
 * @property {string} name
 * @property {string} description
 * @property {array<UpdateProductOptionGroupListData>} productOptionGroupList
 * @property {array<UpdateCategoryListBody>} categoryList
 */

/**
 * PUT /restaurant/{restaurantId}/product/{id}
 * @summary Update Product
 * @tags Product
 * @security BearerAuth
 * @param {UpdateProductBody} request.body
 * @param {integer} restaurantId.path.required
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 * @return {UnauthorizedRequest} 401 - Unauthorized response - application/json
 * @return {ForbiddenRequest} 403 - Forbidden response - application/json
 */
export const updateProductController: Controller =
  () =>
  async ({ lang, restaurant, ...request }: Request, response: Response) => {
    let err = 0;

    try {
      await updateProductSchema.validate(request, { abortEarly: false });

      const {
        name,
        description,
        price,
        inStock,
        published,
        highlight,
        discount,
        startDiscountAt,
        finishDiscountAt,
        onlyInRestaurant,
        priceByKmInDelivery,
        productOptionGroupList,
        categoryList
      } = request.body as Body;

      await DataSource.transaction(async (manager) => {
        await manager.update(
          ProductEntity,
          { id: toNumber(request.params.id), restaurantId: restaurant.id, finishedAt },
          {
            name,
            description,
            price,
            inStock,
            published,
            finalPrice: discount ?? price,
            highlight,
            discount,
            startDiscountAt,
            finishDiscountAt,
            onlyInRestaurant,
            priceByKmInDelivery
          }
        );

        if (productOptionGroupList?.length || categoryList?.length) {
          const groupToUpdate: Partial<ProductOptionGroupEntity>[] = [];
          const itemToUpdate: Partial<ProductOptionItemEntity>[] = [];

          const product = await findOneFullProduct(toNumber(request.params.id), restaurant.id);

          if (!product) {
            err = 1;
            throw new Error();
          }

          if (productOptionGroupList?.length) {
            for (const productGroupValue of productOptionGroupList) {
              const productGroup = product.productOptionGroupList?.find(
                (item) => item.id === productGroupValue.id
              );

              if (productGroup) {
                const {
                  id,
                  name,
                  description,
                  maxSelection,
                  minSelection,
                  required,
                  productOptionItemList
                } = productGroupValue;

                groupToUpdate.push({ id, name, description, minSelection, maxSelection, required });

                for (const productItemValue of productOptionItemList) {
                  const productItem = productGroup.productOptionItemList?.find(
                    (item) => item.id === productItemValue.id
                  );

                  if (productItem) {
                    const { additionalPrice, description, id, imageUrl, name } = productItemValue;
                    itemToUpdate.push({ id, name, description, imageUrl, additionalPrice });
                  }
                }
              }
            }
          }

          if (groupToUpdate?.length) await manager.save(ProductOptionGroupEntity, groupToUpdate);
          if (itemToUpdate?.length) await manager.save(ProductOptionItemEntity, itemToUpdate);

          if (categoryList?.length) {
            const newCategoryIds = new Set(categoryList.map((cat) => cat.id));
            const currentCategoryIds = new Set(product.categoryList.map((cat) => cat.id));

            if (
              newCategoryIds.size === currentCategoryIds.size &&
              [...newCategoryIds].every((id) => currentCategoryIds.has(id))
            ) {
              return;
            }

            const categoriesToDelete = product.categoryList
              .filter((item) => !newCategoryIds.has(item.id))
              .map((item) => item.id);

            if (categoriesToDelete.length) {
              await manager.delete(ProductCategoryEntity, {
                product: { id: product.id },
                category: { id: In(categoriesToDelete) }
              });
            }

            const validCategories = await manager.find(CategoryEntity, {
              select: { id: true },
              where: { restaurantId: restaurant.id, finishedAt }
            });

            const validCategoryIds = new Set(validCategories.map((cat) => cat.id));
            const categoriesToCreate: { productId: number; categoryId: number }[] = [];

            for (const newCategory of categoryList) {
              if (validCategoryIds.has(newCategory.id) && !currentCategoryIds.has(newCategory.id)) {
                categoriesToCreate.push({
                  productId: product.id,
                  categoryId: newCategory.id
                });
              }
            }

            if (categoriesToCreate.length) {
              await manager.insert(ProductCategoryEntity, categoriesToCreate);
            }
          }
        }
      });

      await cache.delete(cacheKeys.productsByRestaurant(restaurant.id));

      return ok({ payload: messages[lang].default.successfullyUpdated, lang, response });
    } catch (error) {
      errorLogger(error);

      if (err === 1) return notFound({ entity: messages[lang].entity.product, lang, response });

      return messageErrorResponse({ error, lang, response });
    }
  };
