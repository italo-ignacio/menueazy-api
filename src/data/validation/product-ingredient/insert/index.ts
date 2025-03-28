import { yup } from '@infra/yup';
import { booleanNotRequired, numberNotRequired, numberRequired } from '@main/utils';

export const insertProductIngredientSchema = yup.object().shape({
  body: yup.object().shape({
    canRemove: booleanNotRequired(),
    canAdd: booleanNotRequired(),
    quantity: numberRequired(),
    maxAddQuantity: numberNotRequired(),
    additionalPrice: numberNotRequired()
  })
});
