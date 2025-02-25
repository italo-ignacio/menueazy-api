import {
  findOneRestaurantController,
  findRestaurantController,
  updateRestaurantController
} from '@application/controller/restaurant';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findRestaurantController());
  router.get('/:id', findOneRestaurantController());
  router.put('/:id', updateRestaurantController());

  inputRouter.use('/restaurant', router);
};
