import { yup } from '@infra/yup';
import {
  booleanRequired,
  numberNotRequired,
  numberRequired,
  stringNotRequired,
  stringRequired
} from '@main/utils';

export const insertRestaurantSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringRequired(255),
    phone: stringRequired(25),
    restaurantUrl: stringRequired(255),
    hasDelivery: booleanRequired(),
    minimumOrderPrice: numberRequired(),
    contactLink: stringNotRequired(),
    description: stringNotRequired(),
    maxDeliveryDistanceInKm: numberNotRequired(),
    minimumDeliveryPrice: numberNotRequired(),
    priceByKmInDelivery: numberNotRequired()
  })
});
