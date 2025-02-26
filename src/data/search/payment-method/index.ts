import type { PaymentMethodEntity } from '@entity/payment-method';
import type { FindOptionsSelect } from 'typeorm';

export const paymentMethodFindParams: FindOptionsSelect<PaymentMethodEntity> = {
  id: true,
  description: true,
  logoUrl: true,
  title: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
