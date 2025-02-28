import {
  findCategoryController,
  findOneCategoryController
} from '@application/controller/category';
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

  inputRouter.use('/restaurant', router);
};
