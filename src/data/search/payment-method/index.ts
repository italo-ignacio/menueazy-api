import type { FindOptionsSelect } from 'typeorm';
import type { PaymentMethodEntity } from '@entity/payment-method';

export const paymentMethodFindParams: FindOptionsSelect<PaymentMethodEntity> = {
  id: true,

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
