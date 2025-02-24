import { yup } from '@infra/yup';
import { numberRequired, stringRequired } from '@main/utils';

export const insertSubscriptionSchema = yup.object().shape({
  body: yup.object().shape({
    price: numberRequired(),
    planId: numberRequired().integer(),
    restaurantLimit: numberRequired().integer(),
    productLimit: numberRequired().integer(),
    code: stringRequired().uuid()
  })
});
