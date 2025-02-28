import { findOneStyleController, findStyleController } from '@application/controller/style';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findStyleController());
  router.get('/:id', findOneStyleController());

  inputRouter.use('/style', router);
};
