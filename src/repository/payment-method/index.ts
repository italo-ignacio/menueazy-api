import { DataSource } from '@infra/database';
import { PaymentMethodEntity } from '@entity/payment-method';

export const paymentMethodRepository = DataSource.getRepository(PaymentMethodEntity);
