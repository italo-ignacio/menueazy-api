import { checkUserCompanyController } from '@application/controller/auth';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/check-company', checkUserCompanyController());

  inputRouter.use('/user', router);
};
