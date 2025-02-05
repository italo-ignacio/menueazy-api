import { Router } from 'express';
import { loginController, recoverPasswordController } from '@application/controller/auth';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/login', loginController());
  router.post('/recover-password', recoverPasswordController());

  inputRouter.use('/', router);
};
