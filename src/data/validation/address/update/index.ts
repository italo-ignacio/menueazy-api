import { yup } from '@infra/yup';
import { numberNotRequired, stringNotRequired } from '@main/utils';

export const updateAddressSchema = yup.object().shape({
  body: yup.object().shape({
    city: stringNotRequired(255),
    country: stringNotRequired(255),
    number: stringNotRequired(30),
    street: stringNotRequired(255),
    state: stringNotRequired(255),
    zipCode: stringNotRequired(25),
    complement: stringNotRequired(255),
    latitude: numberNotRequired(),
    longitude: numberNotRequired()
  })
});
