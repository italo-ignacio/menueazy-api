import { userRegisterController } from '@application/controller/user';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/register', userRegisterController());

  inputRouter.use('/user', router);
};
