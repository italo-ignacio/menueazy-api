import { deleteUserController, insertUserController } from '@application/controller/user';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', insertUserController());
  router.delete('/:id', deleteUserController());

  inputRouter.use('/user', router);
};
