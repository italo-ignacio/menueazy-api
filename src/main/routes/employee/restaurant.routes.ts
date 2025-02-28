import { findRestaurantController } from '@application/controller/restaurant';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findRestaurantController());

  inputRouter.use('/restaurant', router);
};
