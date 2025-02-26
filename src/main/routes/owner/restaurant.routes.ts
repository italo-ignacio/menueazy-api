import {
  deleteRestaurantController,
  insertRestaurantController
} from '@application/controller/restaurant';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertRestaurantController());
  router.delete('/:restaurantUrl', deleteRestaurantController());

  inputRouter.use('/restaurant', router);
};
