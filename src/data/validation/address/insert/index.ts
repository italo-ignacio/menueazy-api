import { yup } from '@infra/yup';
import { numberRequired, stringNotRequired, stringRequired } from '@main/utils';

export const insertAddressSchema = yup.object().shape({
  body: yup.object().shape({
    city: stringRequired(255),
    country: stringRequired(255),
    number: stringRequired(30),
    street: stringRequired(255),
    state: stringRequired(255),
    zipCode: stringRequired(25),
    complement: stringNotRequired(255),
    latitude: numberRequired(),
    longitude: numberRequired()
  })
});
