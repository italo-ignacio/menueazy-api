import {
  findCategoryController,
  findOneCategoryController
} from '@application/controller/category';
import {
  findIngredientController,
  findOneIngredientController
} from '@application/controller/ingredient';
import { findOpeningHourController } from '@application/controller/opening-hour';
import { findPaymentMethodController } from '@application/controller/payment-method';
import { findRestaurantByURLController } from '@application/controller/restaurant';
import { findOneTableController, findTableController } from '@application/controller/table';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/:restaurantUrl/url', findRestaurantByURLController());

  router.get('/:restaurantId/category', findCategoryController());
  router.get('/:restaurantId/category/:id', findOneCategoryController());

  router.get('/:restaurantId/opening-hour', findOpeningHourController());

  router.get('/:restaurantId/payment-method', findPaymentMethodController());

  router.get('/:restaurantId/table', findTableController());
  router.get('/:restaurantId/table/:id', findOneTableController());

  router.get('/:restaurantId/ingredient', findIngredientController());
  router.get('/:restaurantId/ingredient/:id', findOneIngredientController());

  inputRouter.use('/restaurant', router);
};
