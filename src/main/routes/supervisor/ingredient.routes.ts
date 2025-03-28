import {
  deleteIngredientController,
  insertIngredientController,
  updateIngredientController
} from '@application/controller/ingredient';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertIngredientController());
  router.put('/:id', updateIngredientController());
  router.delete('/:id', deleteIngredientController());

  inputRouter.use('/restaurant/:restaurantId/ingredient', router);
};
