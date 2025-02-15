import {
  preUserLoginController,
  recoverPasswordController,
  userLoginController
} from '@application/controller/auth';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  // User Login
  router.post('/pre-user-login', preUserLoginController());
  router.post('/user-login', userLoginController());

  router.post('/recover-password', recoverPasswordController());

  inputRouter.use('/auth', router);
};
