import { findPlanController } from '@application/controller/plan';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findPlanController());

  inputRouter.use('/plan', router);
};
