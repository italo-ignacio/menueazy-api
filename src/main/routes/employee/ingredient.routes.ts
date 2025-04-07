import { findIngredientController } from '@application/controller/ingredient';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/:ingredientId/data', findIngredientController());

  inputRouter.use('/restaurant/:restaurantId/ingredient', router);
};
