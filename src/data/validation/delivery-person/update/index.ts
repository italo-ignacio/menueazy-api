import { yup } from '@infra/yup';
import { stringNotRequired } from '@main/utils';

export const updateDeliveryPersonSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired(100),
    phone: stringNotRequired(25)
  })
});
