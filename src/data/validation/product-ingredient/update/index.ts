import { yup } from '@infra/yup';
import { booleanNotRequired, numberNotRequired } from '@main/utils';

export const updateProductIngredientSchema = yup.object().shape({
  body: yup.object().shape({
    canRemove: booleanNotRequired(),
    canAdd: booleanNotRequired(),
    quantity: numberNotRequired(),
    maxAddQuantity: numberNotRequired(),
    additionalPrice: numberNotRequired()
  })
});
