import { yup } from '@infra/yup';
import { stringNotRequired, stringRequired } from '@main/utils';

const paymentMethodSchema = yup.object().shape({
  title: stringRequired(150),
  description: stringNotRequired(),
  logoUrl: stringNotRequired()
});

export const updatePaymentMethodSchema = yup.object().shape({
  body: paymentMethodSchema
});

export const insertPaymentMethodSchema = yup.object().shape({
  body: yup.object().shape({
    paymentMethods: yup.array().of(paymentMethodSchema)
  })
});
