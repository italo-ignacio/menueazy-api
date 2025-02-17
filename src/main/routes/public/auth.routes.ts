import { preUserLoginController, userLoginController } from '@application/controller/auth';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  // User Login
  router.post('/user/pre-login', preUserLoginController());
  router.post('/user/login', userLoginController());

  inputRouter.use('/auth', router);
};
