import { yup } from '@infra/yup';
import { dateNotRequired, numberRequired } from '@main/utils';

export const insertIngredientDataSchema = yup.object().shape({
  body: yup.object().shape({
    quantity: numberRequired(),
    unitPrice: numberRequired(),
    expiresAt: dateNotRequired()
  })
});
