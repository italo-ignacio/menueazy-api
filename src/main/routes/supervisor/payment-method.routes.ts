import {
  deletePaymentMethodController,
  insertPaymentMethodController,
  updatePaymentMethodController
} from '@application/controller/payment-method';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertPaymentMethodController());
  router.put('/:id', updatePaymentMethodController());
  router.delete('/:id', deletePaymentMethodController());

  inputRouter.use('/restaurant/:restaurantId/payment-method', router);
};
