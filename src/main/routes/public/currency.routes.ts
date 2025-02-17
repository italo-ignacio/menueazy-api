import { findCurrencyController } from '@application/controller/currency';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findCurrencyController());

  inputRouter.use('/currency', router);
};
