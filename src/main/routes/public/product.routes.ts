import {
  findAllProductController,
  findOneProductController,
  findProductController
} from '@application/controller/product';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findProductController());
  router.get('/all', findAllProductController());
  router.get('/:id', findOneProductController());

  inputRouter.use('/restaurant/:restaurantId/product', router);
};
