import {
  findRegisterRequestController,
  patchRegisterRequestController
} from '@application/controller/register-request';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findRegisterRequestController());
  router.patch('/', patchRegisterRequestController());

  inputRouter.use('/register-request', router);
};
