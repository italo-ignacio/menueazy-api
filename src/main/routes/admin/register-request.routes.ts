import {
  findOneRegisterRequestController,
  findRegisterRequestController,
  patchRegisterRequestController
} from '@application/controller/register-request';
import { Router } from 'express';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/', findRegisterRequestController());
  router.get('/:id', findOneRegisterRequestController());
  router.patch('/', patchRegisterRequestController());

  inputRouter.use('/register-request', router);
};
