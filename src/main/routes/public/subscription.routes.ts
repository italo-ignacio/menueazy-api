import {
  findSubscriptionByCodeController,
  insertSubscriptionRequestController
} from '@application/controller/subscription';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/:code/code', findSubscriptionByCodeController());
  router.post('/', insertSubscriptionRequestController());

  inputRouter.use('/subscription', router);
};
