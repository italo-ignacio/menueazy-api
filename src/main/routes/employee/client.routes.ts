import { findOneClientController } from '@application/controller/client';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/:id', findOneClientController());

  inputRouter.use('/client', router);
};
