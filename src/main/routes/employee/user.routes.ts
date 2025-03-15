import {
  checkUserCompanyController,
  checkUserRestaurantController
} from '@application/controller/user';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/check-company', checkUserCompanyController());
  router.post('/check-restaurant', checkUserRestaurantController());

  inputRouter.use('/user', router);
};
