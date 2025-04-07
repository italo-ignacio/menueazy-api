import {
  deleteIngredientController,
  insertIngredientController,
  updateIngredientController
} from '@application/controller/ingredient';
import {
  deleteIngredientDataController,
  insertIngredientDataController,
  updateIngredientDataController
} from '@application/controller/ingredient-data';
import { handleMulterError, insertImage, uploadFilesMiddleware } from '@main/utils';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post(
    '/',
    uploadFilesMiddleware,
    handleMulterError,
    insertImage(),
    insertIngredientController()
  );
  router.put(
    '/:id',
    uploadFilesMiddleware,
    handleMulterError,
    insertImage(),
    updateIngredientController()
  );
  router.delete('/:id', deleteIngredientController());

  router.post('/:ingredientId/data', insertIngredientDataController());
  router.put('/:ingredientId/data/:id', updateIngredientDataController());
  router.delete('/:ingredientId/data/:id', deleteIngredientDataController());

  inputRouter.use('/restaurant/:restaurantId/ingredient', router);
};
