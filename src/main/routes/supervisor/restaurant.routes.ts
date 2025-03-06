import {
  insertRestaurantAddressController,
  updateRestaurantAddressController
} from '@application/controller/address/restaurant';
import {
  checkRestaurantUrlController,
  openRestaurantController,
  updateRestaurantController
} from '@application/controller/restaurant';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/check-url', checkRestaurantUrlController());

  router.put('/:restaurantId', updateRestaurantController());

  router.patch('/:restaurantId/open', openRestaurantController());

  router.post('/:restaurantId/address', insertRestaurantAddressController());
  router.put('/:restaurantId/address', updateRestaurantAddressController());

  inputRouter.use('/restaurant', router);
};
