import { deleteProductController, insertProductController } from '@application/controller/product';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertProductController());
  router.delete('/:id', deleteProductController());

  inputRouter.use('/restaurant/:restaurantId/product', router);
};
