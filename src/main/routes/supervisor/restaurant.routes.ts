import {
  checkRestaurantUrlController,
  updateRestaurantController
} from '@application/controller/restaurant';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/check-url', checkRestaurantUrlController());
  router.put('/:restaurantId', updateRestaurantController());

  inputRouter.use('/restaurant', router);
};
