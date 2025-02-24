import { yup } from '@infra/yup';
import { emailNotRequired, stringNotRequired } from '@main/utils';

export const updateRestaurantSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailNotRequired(),
    name: stringNotRequired(),
    password: stringNotRequired(),
    phone: stringNotRequired()
  })
});
