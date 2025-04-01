import { yup } from '@infra/yup';
import {
  arrayNotRequired,
  arrayRequired,
  booleanNotRequired,
  dateNotRequired,
  numberNotRequired,
  numberRequired,
  stringNotRequired
} from '@main/utils';

export const updateProductOptionItemListSchema = yup.object().shape({
  id: numberNotRequired().integer(),
  name: stringNotRequired(100),
  description: stringNotRequired(),
  imageUrl: stringNotRequired(),
  additionalPrice: numberNotRequired()
});

export const updateProductOptionGroupListSchema = yup.object().shape({
  id: numberNotRequired().integer(),
  name: stringNotRequired(100),
  description: stringNotRequired(),
  minSelection: numberNotRequired(),
  maxSelection: numberNotRequired(),
  required: booleanNotRequired(),
  productOptionItemList: arrayNotRequired(updateProductOptionItemListSchema)
});

export const updateProductCategoryListSchema = yup.object().shape({
  id: numberNotRequired().integer()
});

export const updateProductSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired(100),
    description: stringNotRequired(),
    price: numberNotRequired(),
    inStock: booleanNotRequired(),
    published: booleanNotRequired(),
    highlight: booleanNotRequired(),
    discount: numberNotRequired(),
    startDiscountAt: dateNotRequired(),
    finishDiscountAt: dateNotRequired(),
    onlyInRestaurant: booleanNotRequired(),
    priceByKmInDelivery: numberNotRequired(),
    productOptionGroupList: arrayNotRequired(updateProductOptionGroupListSchema),
    categoryList: arrayNotRequired(updateProductCategoryListSchema)
  })
});

export const updateMultipleProductSchema = yup.object().shape({
  body: yup.object().shape({
    inStock: booleanNotRequired(),
    published: booleanNotRequired(),
    delete: booleanNotRequired(),
    highlight: booleanNotRequired(),
    ids: arrayRequired(numberRequired())
  })
});
