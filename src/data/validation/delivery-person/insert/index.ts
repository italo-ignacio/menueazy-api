import { yup } from '@infra/yup';
import { stringNotRequired, stringRequired } from '@main/utils';

export const insertDeliveryPersonSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringRequired(100),
    phone: stringNotRequired(25)
  })
});
