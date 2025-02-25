import { findRestaurantByURLController } from '@application/controller/restaurant';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/:restaurantUrl/url', findRestaurantByURLController());

  inputRouter.use('/restaurant', router);
};
