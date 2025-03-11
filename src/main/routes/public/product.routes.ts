import {
  findProductByCategoryController,
  findProductController
} from '@application/controller/product';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findProductController());
  router.get('/category/:id', findProductByCategoryController());

  inputRouter.use('/restaurant/:restaurantId/product', router);
};
