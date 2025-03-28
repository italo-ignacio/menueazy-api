import { yup } from '@infra/yup';
import { dateNotRequired, numberNotRequired } from '@main/utils';

export const updateIngredientDataSchema = yup.object().shape({
  body: yup.object().shape({
    unitPrice: numberNotRequired(),
    entryQuantity: numberNotRequired(),
    quantity: numberNotRequired(),
    expiresAt: dateNotRequired()
  })
});
