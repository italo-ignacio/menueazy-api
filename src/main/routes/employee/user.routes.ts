import {
  checkUserCompanyController,
  checkUserRestaurantController,
  findOneUserController,
  findUserController,
  updateUserController
} from '@application/controller/user';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/check-company', checkUserCompanyController());
  router.post('/check-restaurant', checkUserRestaurantController());

  router.get('/', findUserController());
  router.get('/:id', findOneUserController());
  router.put('/:id', updateUserController());

  inputRouter.use('/user', router);
};
