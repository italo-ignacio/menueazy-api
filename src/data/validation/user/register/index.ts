import { yup } from '@infra/yup';
import { emailRequired, numberRequired, stringRequired } from '@main/utils';

export const registerUserSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailRequired(),
    name: stringRequired(255),
    password: stringRequired(),
    phone: stringRequired(25),
    companyName: stringRequired(255),
    companyUrl: stringRequired(255),
    currencyId: numberRequired().integer(),
    planId: numberRequired().integer()
  })
});
