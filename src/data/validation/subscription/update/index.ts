import { yup } from '@infra/yup';
import { emailNotRequired, stringNotRequired } from '@main/utils';

export const updateSubscriptionSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailNotRequired(),
    name: stringNotRequired(),
    password: stringNotRequired(),
    phone: stringNotRequired()
  })
});
