import { findTableByCodeController } from '@application/controller/table';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/:code', findTableByCodeController());

  inputRouter.use('/table', router);
};
