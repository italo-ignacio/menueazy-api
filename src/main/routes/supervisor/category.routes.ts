import {
  deleteCategoryController,
  insertCategoryController,
  updateCategoryController,
  updateCategoryOrderController
} from '@application/controller/category';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertCategoryController());
  router.put('/order', updateCategoryOrderController());
  router.put('/:id', updateCategoryController());
  router.delete('/:id', deleteCategoryController());

  inputRouter.use('/restaurant/:restaurantId/category', router);
};
