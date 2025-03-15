import {
  deleteDeliveryPersonController,
  findDeliveryPersonController,
  findOneDeliveryPersonController,
  insertDeliveryPersonController,
  updateDeliveryPersonController
} from '@application/controller/delivery-person';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findDeliveryPersonController());
  router.get('/:id', findOneDeliveryPersonController());
  router.post('/', insertDeliveryPersonController());
  router.put('/:id', updateDeliveryPersonController());
  router.delete('/:id', deleteDeliveryPersonController());

  inputRouter.use('/restaurant/:restaurantId/delivery-person', router);
};
