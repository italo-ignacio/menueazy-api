import { updateRestaurantController } from '@application/controller/restaurant';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.put('/:restaurantUrl', updateRestaurantController());

  inputRouter.use('/restaurant', router);
};
