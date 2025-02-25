import { yup } from '@infra/yup';
import { booleanNotRequired, numberNotRequired, stringNotRequired } from '@main/utils';

export const updateRestaurantSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired(255),
    phone: stringNotRequired(25),
    restaurantUrl: stringNotRequired(255),
    hasDelivery: booleanNotRequired(),
    minimumOrderPrice: numberNotRequired(),
    styleId: numberNotRequired().integer(),
    contactLink: stringNotRequired(),
    description: stringNotRequired(),
    maxDeliveryDistanceInKm: numberNotRequired(),
    minimumDeliveryPrice: numberNotRequired(),
    priceByKmInDelivery: numberNotRequired()
  })
});
