import { insertSubscriptionRequestController } from '@application/controller/subscription';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertSubscriptionRequestController());

  inputRouter.use('/subscription', router);
};
