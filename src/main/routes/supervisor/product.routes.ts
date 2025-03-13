import {
  deleteProductController,
  insertProductController,
  updateProductController
} from '@application/controller/product';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertProductController());
  router.put('/:id', updateProductController());
  router.delete('/:id', deleteProductController());

  inputRouter.use('/restaurant/:restaurantId/product', router);
};
