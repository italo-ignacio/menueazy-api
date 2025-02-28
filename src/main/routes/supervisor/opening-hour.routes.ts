import {
  deleteOpeningHourController,
  insertOpeningHourController,
  updateOpeningHourController
} from '@application/controller/opening-hour';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertOpeningHourController());
  router.put('/:id', updateOpeningHourController());
  router.delete('/:id', deleteOpeningHourController());

  inputRouter.use('/restaurant/:restaurantId/opening-hour', router);
};
