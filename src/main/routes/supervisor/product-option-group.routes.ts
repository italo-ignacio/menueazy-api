import {
  deleteProductOptionGroupController,
  insertProductOptionGroupController
} from '@application/controller/product-option-group';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertProductOptionGroupController());
  router.delete('/:id', deleteProductOptionGroupController());

  inputRouter.use('/restaurant/:restaurantId/product-option-group', router);
};
