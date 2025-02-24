import { yup } from '@infra/yup';
import { emailRequired, stringRequired } from '@main/utils';

export const insertRestaurantSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailRequired(),
    name: stringRequired(),
    password: stringRequired(),
    phone: stringRequired()
  })
});
