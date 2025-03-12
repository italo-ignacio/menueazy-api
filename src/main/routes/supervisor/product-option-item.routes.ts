import {
  deleteProductOptionItemController,
  insertProductOptionItemController
} from '@application/controller/product-option-item';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertProductOptionItemController());
  router.delete('/:id', deleteProductOptionItemController());

  inputRouter.use('/restaurant/:restaurantId/product-option-item', router);
};
